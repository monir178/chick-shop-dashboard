"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleDollarSign, ShoppingBag, Users } from "lucide-react";

type TDashboardCardProps = {
  title: string;
  amount: string | number;
  icon: string;
};

const iconMap: { [key: string]: React.ElementType } = {
  CircleDollarSign,
  ShoppingBag,
  Users,
};

export default function DashboardCard({
  title,
  amount,
  icon,
}: TDashboardCardProps) {
  const Icon = iconMap[icon];

  const gradientAnimation = {
    initial: { backgroundPosition: "0% 50%" },
    animate: {
      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      transition: { duration: 4, ease: "linear", repeat: Infinity },
    },
  };

  return (
    <motion.div
      variants={gradientAnimation}
      initial="initial"
      animate="animate"
      className="bg-gradient-to-bl relative overflow-hidden from-gray-400 via-white  to-orange-400 rounded-lg p-1"
      style={{
        backgroundSize: "200% 200%",
      }}>
      <Card className="bg-gray-100 h-[150px] md:h-full relative shadow-md rounded-lg p-0 md:p-6 ">
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle className="text-body-bold md:text-heading4-bold  text-gray-500">
            {title}
          </CardTitle>
          {Icon && <Icon className="text-gray-500 hidden sm:block" />}
        </CardHeader>
        <CardContent>
          <p className="text-body-bold md:text-heading3-bold  text-gray-700">
            {amount}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
