"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/Button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form"
import { Input } from "@/components/ui/Input"
import { ComboBox } from "../ui/ComboBox"
import { useEffect, useState } from "react"
import axiosInstance from "@/api/axiosInstance"

interface StockData {
  currency: string;
  description: string;
  displaySymbol: string;
  figi: string;
  isin: string | null;
  mic: string;
  shareClassFIGI: string;
  symbol: string;
  symbol2: string;
  type: string;
}

const FormSchema = z.object({
  priceAlert: z
    .string()
    .min(1, {
      message: "Price cannot be empty",
    })
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
      message: "Price must be a valid number greater or equal to 0",
    }),
  stock: z.string(),
});

export function SearchForm() {
  const [data, setData] = useState<StockData[] | null>(null);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      priceAlert: "",
      stock: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log('DATA', data);
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosInstance.get('/stock/symbol?exchange=US');
      setData(response.data);
    };

    fetchData();
  }, []);

  const transformedOptions = data ? data.map((item) => ({
    label: item.displaySymbol,
    value: item.symbol,
  })) : [];

  console.log('transformedOptions', transformedOptions);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-4">
        <FormField
          control={form.control}
          name="priceAlert"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input type="string" placeholder="price" {...field}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="stock"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Stock</FormLabel>
              <ComboBox options={transformedOptions} initialValue={field.value}/>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}