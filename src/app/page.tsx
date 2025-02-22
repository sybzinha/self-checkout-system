"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

const HomePage = () => {
  const router = useRouter();
  const handleAccessClick = () => router.push("/mc-donalds");

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-white text-black">
      <Image src="/logo.png" alt="McDonald's" width={120} height={120} />
      <h2 className="mt-4 text-2xl font-bold">Mc Donald&apos;s</h2>
      <p className="mt-2 w-4/5 max-w-md text-center text-lg text-gray-600">
        Escolha como deseja fazer seu pedido e aproveite sua refeição com
        praticidade e sabor!
      </p>
      <Button
        className="mt-6 w-3/5 rounded-lg bg-red-500 py-3 text-lg font-semibold text-white hover:bg-red-600"
        onClick={handleAccessClick}
      >
        Acessar o Menu
      </Button>
    </div>
  );
};

export default HomePage;
