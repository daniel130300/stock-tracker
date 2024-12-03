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

const FormSchema = z.object({
  priceAlert: z
    .string()
    .min(1, {
      message: "Price cannot be empty",
    })
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
      message: "Price must be a valid number greater or equal to 0",
    }),
});

export function SearchForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      priceAlert: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log('DATA', data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="priceAlert"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input type="string" placeholder="price" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
