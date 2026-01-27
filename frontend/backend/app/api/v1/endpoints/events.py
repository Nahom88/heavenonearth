"""
Heaven on Earth CMS Backend - Event Endpoints

Handles event management for the website.
"""

from datetime import date
from typing import Annotated, Optional, List
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.ext.asyncio import AsyncSession

from app.crud.event import (
    get_events,
    get_event_by_id,
    create_event,
    update_event,
    delete_event,
)
from app.database import get_db
from app.dependencies import get_current_active_admin, get_optional_current_admin
from app.models.admin import Admin
from app.schemas.event import EventResponse, EventCreate, EventUpdate
from app.schemas.common import MessageResponse, PaginatedResponse


router = APIRouter(prefix="/events", tags=["Events"])


@router.get("", response_model=PaginatedResponse[EventResponse])
async def list_events(
    db: Annotated[AsyncSession, Depends(get_db)],
    current_admin: Annotated[Optional[Admin], Depends(get_optional_current_admin)],
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    category: Optional[str] = None,
    is_featured: Optional[bool] = None,
    date_from: Optional[date] = None,
    date_to: Optional[date] = None,
    search: Optional[str] = None,
):
    """
    List all events with pagination and filtering.
    
    Unauthenticated users only see published events.
    Admins can see all events.
    """
    skip = (page - 1) * page_size
    
    # Only admins can see unpublished events
    is_published = True if not current_admin else None
    
    events, total = await get_events(
        db,
        skip=skip,
        limit=page_size,
        category=category,
        is_featured=is_featured,
        is_published=is_published,
        date_from=date_from,
        date_to=date_to,
        search=search,
    )
    
    return PaginatedResponse.create(
        items=events,
        total=total,
        page=page,
        page_size=page_size,
    )


@router.get("/{event_id}", response_model=EventResponse)
async def get_event(
    event_id: UUID,
    db: Annotated[AsyncSession, Depends(get_db)],
    current_admin: Annotated[Optional[Admin], Depends(get_optional_current_admin)],
):
    """
    Get an event by ID.
    """
    event = await get_event_by_id(db, event_id=event_id)
    if not event:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Event not found",
        )
    
    # Only admins can see unpublished events
    if not event.is_published and not current_admin:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Event not found",
        )
        
    return event


@router.post("", response_model=EventResponse, status_code=status.HTTP_201_CREATED)
async def create_new_event(
    event_in: EventCreate,
    db: Annotated[AsyncSession, Depends(get_db)],
    current_admin: Annotated[Admin, Depends(get_current_active_admin)],
):
    """
    Create a new event.
    
    Requires admin authentication.
    """
    return await create_event(db, event_in=event_in, created_by_id=current_admin.id)


@router.put("/{event_id}", response_model=EventResponse)
async def update_existing_event(
    event_id: UUID,
    event_update: EventUpdate,
    db: Annotated[AsyncSession, Depends(get_db)],
    current_admin: Annotated[Admin, Depends(get_current_active_admin)],
):
    """
    Update an existing event.
    
    Requires admin authentication.
    """
    event = await get_event_by_id(db, event_id=event_id)
    if not event:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Event not found",
        )
    
    return await update_event(db, event=event, event_update=event_update)


@router.delete("/{event_id}", response_model=MessageResponse)
async def delete_existing_event(
    event_id: UUID,
    db: Annotated[AsyncSession, Depends(get_db)],
    current_admin: Annotated[Admin, Depends(get_current_active_admin)],
):
    """
    Delete an event.
    
    Requires admin authentication.
    """
    event = await get_event_by_id(db, event_id=event_id)
    if not event:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Event not found",
        )
    
    await delete_event(db, event=event)
    return MessageResponse(message="Event deleted successfully")
