"""
Heaven on Earth CMS Backend - Gallery Schemas

Pydantic schemas for gallery management.
"""

from datetime import datetime
from typing import Optional, List
from uuid import UUID

from pydantic import BaseModel, Field


class GalleryItemBase(BaseModel):
    """Base schema for gallery item data."""
    
    title: str = Field(min_length=1, max_length=255)
    title_am: Optional[str] = Field(default=None, max_length=255)
    description: Optional[str] = None
    alt_text: str = Field(min_length=1, max_length=255)
    media_type: str = Field(
        default="image",
        pattern="^(image|video)$"
    )
    category: str = Field(
        default="general",
        pattern="^(worship|outreach|youth|events|general)$"
    )


class GalleryItemCreate(GalleryItemBase):
    """Schema for creating a gallery item."""
    
    src_url: str = Field(min_length=1, max_length=500)
    thumbnail_url: Optional[str] = Field(default=None, max_length=500)
    file_name: Optional[str] = Field(default=None, max_length=255)
    file_size: Optional[int] = Field(default=None, ge=0)
    mime_type: Optional[str] = Field(default=None, max_length=100)
    width: Optional[int] = Field(default=None, ge=0)
    height: Optional[int] = Field(default=None, ge=0)
    event_date: Optional[datetime] = None
    is_featured: bool = False
    is_published: bool = True
    display_order: int = 0


class GalleryItemUpdate(BaseModel):
    """Schema for updating a gallery item."""
    
    title: Optional[str] = Field(default=None, min_length=1, max_length=255)
    title_am: Optional[str] = Field(default=None, max_length=255)
    description: Optional[str] = None
    alt_text: Optional[str] = Field(default=None, min_length=1, max_length=255)
    category: Optional[str] = Field(
        default=None,
        pattern="^(worship|outreach|youth|events|general)$"
    )
    event_date: Optional[datetime] = None
    is_featured: Optional[bool] = None
    is_published: Optional[bool] = None
    display_order: Optional[int] = None


class GalleryItemResponse(GalleryItemBase):
    """Schema for gallery item response."""
    
    id: UUID
    src_url: str
    thumbnail_url: Optional[str] = None
    file_name: Optional[str] = None
    file_size: Optional[int] = None
    mime_type: Optional[str] = None
    width: Optional[int] = None
    height: Optional[int] = None
    event_date: Optional[datetime] = None
    is_featured: bool
    is_published: bool
    display_order: int
    created_by_id: Optional[UUID] = None
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True


class GalleryItemList(BaseModel):
    """Schema for list of gallery items."""
    
    items: List[GalleryItemResponse]
    total: int
    page: int
    page_size: int


class GalleryItemPublic(BaseModel):
    """Public gallery item data for frontend."""
    
    id: UUID
    title: str
    title_am: Optional[str] = None
    description: Optional[str] = None
    alt_text: str
    media_type: str
    src_url: str
    thumbnail_url: Optional[str] = None
    category: str
    event_date: Optional[datetime] = None
    
    class Config:
        from_attributes = True


class GalleryFilter(BaseModel):
    """Schema for filtering gallery items."""
    
    category: Optional[str] = None
    media_type: Optional[str] = None
    is_featured: Optional[bool] = None
    is_published: Optional[bool] = None
    search: Optional[str] = None
