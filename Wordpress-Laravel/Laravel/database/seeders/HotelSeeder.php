<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Hotel;
use App\Models\RoomType;

class HotelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create Au Lac Charner Hotel
        $auLacCharner = Hotel::create([
            'name' => 'Au Lac Charner Hotel',
            'description' => 'Luxury hotel in the heart of Ho Chi Minh City, offering world-class amenities and exceptional service.',
            'address' => '87-89-91 Dong Khoi Street',
            'city' => 'Ho Chi Minh City',
            'country' => 'Vietnam',
            'phone' => '+84 28 3824 5555',
            'email' => 'info@aulac-charner.com',
            'website' => 'https://aulac-charner.com',
            'rating' => 4.8,
            'amenities' => [
                'Free WiFi',
                'Swimming Pool',
                'Spa & Wellness Center',
                'Restaurant & Bar',
                'Fitness Center',
                'Business Center',
                'Concierge Service',
                'Valet Parking'
            ],
            'images' => [
                'https://example.com/images/charner-exterior.jpg',
                'https://example.com/images/charner-lobby.jpg',
                'https://example.com/images/charner-pool.jpg'
            ],
            'is_active' => true,
        ]);

        // Create room types for Au Lac Charner
        RoomType::create([
            'hotel_id' => $auLacCharner->id,
            'name' => 'Deluxe Room',
            'description' => 'Spacious room with city view, modern amenities, and comfortable furnishings.',
            'capacity' => 2,
            'base_price' => 2500000, // 2.5M VND
            'amenities' => [
                'King-size bed',
                'City view',
                'Mini bar',
                'In-room safe',
                'Free WiFi',
                'Flat-screen TV',
                'Air conditioning',
                'Private bathroom'
            ],
            'images' => [
                'https://example.com/images/charner-deluxe.jpg'
            ],
            'is_active' => true,
        ]);

        RoomType::create([
            'hotel_id' => $auLacCharner->id,
            'name' => 'Executive Suite',
            'description' => 'Luxurious suite with separate living area, premium amenities, and panoramic city views.',
            'capacity' => 3,
            'base_price' => 4500000, // 4.5M VND
            'amenities' => [
                'King-size bed + sofa bed',
                'Separate living area',
                'Panoramic city view',
                'Premium mini bar',
                'In-room safe',
                'Free WiFi',
                'Large flat-screen TV',
                'Air conditioning',
                'Luxury bathroom',
                'Executive lounge access'
            ],
            'images' => [
                'https://example.com/images/charner-executive.jpg'
            ],
            'is_active' => true,
        ]);

        // Create Au Lac Legend Hotel
        $auLacLegend = Hotel::create([
            'name' => 'Au Lac Legend Hotel',
            'description' => 'Boutique hotel offering authentic Vietnamese hospitality with modern comfort and traditional charm.',
            'address' => '123 Nguyen Hue Boulevard',
            'city' => 'Ho Chi Minh City',
            'country' => 'Vietnam',
            'phone' => '+84 28 3822 8888',
            'email' => 'info@aulac-legend.com',
            'website' => 'https://aulac-legend.com',
            'rating' => 4.6,
            'amenities' => [
                'Free WiFi',
                'Garden Terrace',
                'Vietnamese Restaurant',
                'Spa Services',
                'Tour Desk',
                'Laundry Service',
                'Bicycle Rental',
                'Airport Transfer'
            ],
            'images' => [
                'https://example.com/images/legend-exterior.jpg',
                'https://example.com/images/legend-garden.jpg',
                'https://example.com/images/legend-restaurant.jpg'
            ],
            'is_active' => true,
        ]);

        // Create room types for Au Lac Legend
        RoomType::create([
            'hotel_id' => $auLacLegend->id,
            'name' => 'Standard Room',
            'description' => 'Comfortable room with traditional Vietnamese design elements and modern amenities.',
            'capacity' => 2,
            'base_price' => 1800000, // 1.8M VND
            'amenities' => [
                'Queen-size bed',
                'Garden view',
                'Mini bar',
                'In-room safe',
                'Free WiFi',
                'Flat-screen TV',
                'Air conditioning',
                'Private bathroom'
            ],
            'images' => [
                'https://example.com/images/legend-standard.jpg'
            ],
            'is_active' => true,
        ]);

        RoomType::create([
            'hotel_id' => $auLacLegend->id,
            'name' => 'Family Room',
            'description' => 'Spacious family room with connecting areas, perfect for families or small groups.',
            'capacity' => 4,
            'base_price' => 3200000, // 3.2M VND
            'amenities' => [
                '2 Queen-size beds',
                'Connecting areas',
                'Garden view',
                'Mini bar',
                'In-room safe',
                'Free WiFi',
                'Large flat-screen TV',
                'Air conditioning',
                'Private bathroom',
                'Extra towels & amenities'
            ],
            'images' => [
                'https://example.com/images/legend-family.jpg'
            ],
            'is_active' => true,
        ]);

        $this->command->info('Sample hotels and room types created successfully!');
    }
}
