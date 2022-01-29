<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Midtrans;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $user_id = $request->user_id;
        $orders = Order::query();

        $orders->when($user_id, function ($query) use ($user_id) {
            return $query->where("user_id", $user_id);
        });

        return response()->json([
            'status' => 'success',
            'data' => $orders->get()
        ]);
    }

    public function store(Request $request)
    {
        $user = $request->user;
        $course = $request->course;

        $order = Order::create([
            'user_id' => $user['id'],
            'course_id' => $course['id'],
        ]);

        $transaction_details = [
            'order_id' => $order->id . '-' . Str::random(5),
            'gross_amount' => $course['price']
        ];

        $item_details[] = [
            'id' => $order->id . '-' . Str::random(5),
            'price' => $course['price'],
            'quantity' => 1,
            'name' => "Payment for {$course['name']} course",
            'brand' => 'BrondoL Online Course',
            'category' => 'Online Course'
        ];

        $userData = [
            'first_name' => $user['name'],
            'last_name' => '',
            'address' => '',
            'city' => '',
            'postal_code' => '',
            'phone' => '',
            'country_code' => ''
        ];

        $customerDetails = [
            'first_name' => $user['name'],
            'last_name' => '',
            'email' => $user['email'],
            'phone' => '',
            'billing_address' => $userData,
            'shipping_address' => $userData
        ];

        $midtransParams = [
            'transaction_details' => $transaction_details,
            'customer_details' => $customerDetails,
            'item_details' => $item_details
        ];

        $midtransSnapUrl = $this->getMidtransSnapUrl($midtransParams);

        $order->snap_url = $midtransSnapUrl;
        $order->metadata = [
            'course_id' => $course['id'],
            'course_price' => $course['price'],
            'course_name' => $course['name'],
            'course_thumbnail' => $course['thumbnail'],
            'course_level' => $course['thumbnail'],
        ];
        $order->save();

        return response()->json([
            'status' => 'success',
            'data' => $order
        ]);
    }

    private function getMidtransSnapUrl($params)
    {
        Midtrans\Config::$serverKey = env("MIDTRANS_SERVER_KEY");
        Midtrans\Config::$isProduction = (bool) env("MIDTRANS_IS_PRODUCTION");
        Midtrans\Config::$isSanitized = (bool) env("MIDTRANS_IS_SANITIZED");
        Midtrans\Config::$is3ds = (bool) env("MIDTRANS_IS_3DS");
        try {
            $snapUrl = Midtrans\Snap::createTransaction($params)->redirect_url;
            return $snapUrl;
        } catch (\Throwable $th) {
            return false;
        }
    }
}
