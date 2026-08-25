import type { Metadata } from "next";
import { CheckoutContent } from "@/components/sections/checkout-content";

export const metadata: Metadata = {
  title: "Đặt hàng",
  description: "Gửi yêu cầu đặt hàng các sản phẩm tinh dầu Song Nguyên trong giỏ hàng của bạn.",
};

export default function CheckoutPage() {
  return <CheckoutContent />;
}
