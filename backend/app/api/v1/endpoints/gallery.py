"""
Heaven on Earth CMS Backend - Gallery Endpoints

Handles gallery media management for the website.
"""

from typing import Annotated, Optional, List
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.ext.asyncio import AsyncSession

from app.crud.gallery import (
    get_gallery_items,
    get_gallery_item_by_id,
    create_gallery_item,
    update_gallery_item,
    delete_gallery_item,
)
from app.database import get_db
from app.dependencies import get_current_active_admin, get_optional_current_admin
from app.models.admin import Admin
from app.schemas.gallery import GalleryItemResponse, GalleryItemCreate, GalleryItemUpdate
from app.schemas.common import MessageResponse, PaginatedResponse


router = APIRouter(prefix="/gallery", tags=["Gallery"])


@router.get("", response_model=PaginatedResponse[GalleryItemResponse])
async def list_gallery_items(
    db: Annotated[AsyncSession, Depends(get_db)],
    current_admin: Annotated[Optional[Admin], Depends(get_optional_current_admin)],
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    category: Optional[str] = None,
    media_type: Optional[str] = None,
    is_featured: Optional[bool] = None,
    search: Optional[str] = None,
):
    """
    List all gallery items with pagination and filtering.
    
    Unauthenticated users only see published items.
    Admins can see all items.
    """
    skip = (page - 1) * page_size
    
    # Only admins can see unpublished items
    is_published = True if not current_admin else None
    
    items, total = await get_gallery_items(
        db,
        skip=skip,
        limit=page_size,
        category=category,
        media_type=media_type,
        is_featured=is_featured,
        is_published=is_published,
        search=search,
    )
    
    return PaginatedResponse.create(
        items=items,
        total=total,
        page=page,
        page_size=page_size,
    )


@router.get("/{item_id}", response_model=GalleryItemResponse)
async def get_gallery_item(
    item_id: UUID,
    db: Annotated[AsyncSession, Depends(get_db)],
    current_admin: Annotated[Optional[Admin], Depends(get_optional_current_admin)],
):
    """
    Get a gallery item by ID.
    """
    item = await get_gallery_item_by_id(db, item_id=item_id)
    if not item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Gallery item not found",
        )
    
    # Only admins can see unpublished items
    if not item.is_published and not current_admin:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Gallery item not found",
        )
        
    return item


@router.post("", response_model=GalleryItemResponse, status_code=status.HTTP_201_CREATED)
async def create_new_gallery_item(
    item_in: GalleryItemCreate,
    db: Annotated[AsyncSession, Depends(get_db)],
    current_admin: Annotated[Admin, Depends(get_current_active_admin)],
):
    """
    Create a new gallery item.
    
    Requires admin authentication.
    """
    return await create_gallery_item(db, item_in=item_in, created_by_id=current_admin.id)


@router.put("/{item_id}", response_model=GalleryItemResponse)
async def update_existing_gallery_item(
    item_id: UUID,
    item_update: GalleryItemUpdate,
    db: Annotated[AsyncSession, Depends(get_db)],
    current_admin: Annotated[Admin, Depends(get_current_active_admin)],
):
    """
    Update an existing gallery item.
    
    Requires admin authentication.
    """
    item = await get_gallery_item_by_id(db, item_id=item_id)
    if not item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Gallery item not found",
        )
    
    return await update_gallery_item(db, item=item, item_update=item_update)


@router.delete("/{item_id}", response_model=MessageResponse)
async def delete_existing_gallery_item(
    item_id: UUID,
    db: Annotated[AsyncSession, Depends(get_db)],
    current_admin: Annotated[Admin, Depends(get_current_active_admin)],
):
    """
    Delete a gallery item.
    
    Requires admin authentication.
    """
    item = await get_gallery_item_by_id(db, item_id=item_id)
    if not item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Gallery item not found",
        )
    
    await delete_gallery_item(db, item=item)
    return MessageResponse(message="Gallery item deleted successfully")
