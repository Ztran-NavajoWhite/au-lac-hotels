<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Carbon\Carbon;

class Booking extends Model
{
    use HasFactory;

    protected $fillable = [
        'booking_reference',
        'user_id',
        'hotel_id',
        'room_type_id',
        'check_in_date',
        'check_out_date',
        'guests',
        'total_amount',
        'tax_amount',
        'discount_amount',
        'final_amount',
        'status',
        'payment_status',
        'payment_method',
        'payment_reference',
        'guest_details',
        'special_requests',
        'confirmed_at',
        'cancelled_at',
    ];

    protected $casts = [
        'check_in_date' => 'date',
        'check_out_date' => 'date',
        'total_amount' => 'decimal:2',
        'tax_amount' => 'decimal:2',
        'discount_amount' => 'decimal:2',
        'final_amount' => 'decimal:2',
        'guest_details' => 'array',
        'confirmed_at' => 'datetime',
        'cancelled_at' => 'datetime',
    ];

    /**
     * Get the user that made the booking.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the hotel for this booking.
     */
    public function hotel(): BelongsTo
    {
        return $this->belongsTo(Hotel::class);
    }

    /**
     * Get the room type for this booking.
     */
    public function roomType(): BelongsTo
    {
        return $this->belongsTo(RoomType::class);
    }

    /**
     * Get the payment for this booking.
     */
    public function payment(): HasOne
    {
        return $this->hasOne(Payment::class);
    }

    /**
     * Calculate the number of nights for this booking.
     */
    public function getNightsAttribute(): int
    {
        return Carbon::parse($this->check_in_date)->diffInDays($this->check_out_date);
    }

    /**
     * Check if the booking can be cancelled.
     */
    public function canBeCancelled(): bool
    {
        return in_array($this->status, ['pending', 'confirmed']) && 
               $this->check_in_date->isAfter(now()->addDays(1));
    }

    /**
     * Generate a unique booking reference.
     */
    public static function generateReference(): string
    {
        do {
            $reference = 'BK' . date('Ymd') . strtoupper(substr(uniqid(), -6));
        } while (static::where('booking_reference', $reference)->exists());

        return $reference;
    }

    /**
     * Scope a query to only include active bookings.
     */
    public function scopeActive($query)
    {
        return $query->whereNotIn('status', ['cancelled']);
    }

    /**
     * Scope a query to only include pending bookings.
     */
    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    /**
     * Scope a query to only include confirmed bookings.
     */
    public function scopeConfirmed($query)
    {
        return $query->where('status', 'confirmed');
    }
}
