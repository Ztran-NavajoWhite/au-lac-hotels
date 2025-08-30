<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class RoomType extends Model
{
    use HasFactory;

    protected $fillable = [
        'hotel_id',
        'name',
        'description',
        'capacity',
        'base_price',
        'amenities',
        'images',
        'is_active',
    ];

    protected $casts = [
        'base_price' => 'decimal:2',
        'amenities' => 'array',
        'images' => 'array',
        'is_active' => 'boolean',
    ];

    /**
     * Get the hotel that owns this room type.
     */
    public function hotel(): BelongsTo
    {
        return $this->belongsTo(Hotel::class);
    }

    /**
     * Get the bookings for this room type.
     */
    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class);
    }

    /**
     * Scope a query to only include active room types.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Get the formatted price attribute.
     */
    public function getFormattedPriceAttribute(): string
    {
        return number_format($this->base_price, 0, ',', '.') . ' VND';
    }
}
