<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\PaymentLog;
use Illuminate\Http\Request;

class WebhookController extends Controller
{
    public function midtransHandler(Request $request)
    {
        $data = $request->all();
        $signature_key = $data['signature_key'];
        $order_id = $data['order_id'];
        $status_code = $data['status_code'];
        $gross_amount = $data['gross_amount'];
        $server_key = env("MIDTRANS_SERVER_KEY");
        $transaction_status = $data['transaction_status'];
        $payment_type = $data['payment_type'];
        $fraud_status = $data['fraud_status'];

        $mySignatureKey = hash('sha512', $order_id . $status_code . $gross_amount . $server_key);
        if ($mySignatureKey !== $signature_key) {
            return response()->json([
                'status' => 'error',
                'message' => 'invalid signature key'
            ], 400);
        }

        $orderId = explode('-', $order_id)[0];
        $order = Order::find($orderId);

        if (!$order) {
            return response()->json([
                'status' => 'error',
                'message' => 'order not found'
            ], 404);
        }

        if ($order->status === 'success') {
            return response()->json([
                'status' => 'error',
                'message' => 'operation not permitted'
            ], 405);
        }

        if ($transaction_status == 'capture') {
            if ($fraud_status == 'challenge') {
                $order->status = "challenge";
            } else if ($fraud_status == 'accept') {
                $order->status = "success";
            }
        } else if ($transaction_status == 'settlement') {
            $order->status = "success";
        } else if (
            $transaction_status == 'cancel' ||
            $transaction_status == 'deny' ||
            $transaction_status == 'expire'
        ) {
            $order->status = "failure";
        } else if ($transaction_status == 'pending') {
            $order->status = "pending";
        }

        $logData = [
            'status' => $transaction_status,
            'order_id' => $orderId,
            'payment_type' => $payment_type,
            'raw_response' => json_encode($data),
        ];
        $order->save();
        PaymentLog::create($logData);

        if($order->status === 'success') {
            createPremiumAccess([
                'user_id' => $order->user_id,
                'course_id' => $order->course_id
            ]);
        }

        return response()->json('Ok');

        return true;
    }
}
