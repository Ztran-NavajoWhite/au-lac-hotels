<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Hotel extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'address',
        'city',
        'country',
        'phone',
        'email',
        'website',
        'rating',
        'amenities',
        'images',
        'is_active',
    ];

    protected $casts = [
        'amenities' => 'array',
        'images' => 'array',
        'rating' => 'decimal:1',
        'is_active' => 'boolean',
    ];

    /**
     * Get the room types for this hotel.
     */
    public function roomTypes(): HasMany
    {
        return $this->hasMany(RoomType::class);
    }

    /**
     * Get the bookings for this hotel.
     */
    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class);
    }

    /**
     * Scope a query to only include active hotels.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Get the full address of the hotel.
     */
    public function getFullAddressAttribute(): string
    {
        return "{$this->address}, {$this->city}, {$this->country}";
    }
}
