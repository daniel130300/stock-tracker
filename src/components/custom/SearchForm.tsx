import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { ComboBox } from "../ui/ComboBox";
import { SearchFormProps } from "@/types/componentInterfaces";

export const FormSchema = z.object({
  priceAlert: z
    .string()
    .min(1, { message: "Price cannot be empty" })
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
      message: "Price must be a valid number greater or equal to 0",
    }),
  stock: z.string().min(1, { message: "Stock cannot be empty" }),
});

export function SearchForm({ onFormSubmit }: SearchFormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      priceAlert: "",
      stock: "",
    },
  });

  const onSelect = (value: string) => {
    form.setValue("stock", value);
  };

  function onSubmit(data: z.infer<typeof FormSchema>) {
    onFormSubmit(data);
    form.reset();
  }

  const options = ['BINANCE:BTCUSDT', 'IC MARKETS:2', 'IC MARKETS:1', 'IC MARKETS:5'];

  const transformedOptions = options.map((item) => ({
    label: item,
    value: item,
  }));

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
        <FormField
          control={form.control}
          name="stock"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Stock</FormLabel>
              <ComboBox
                options={transformedOptions}
                initialValue={field.value}
                onSelect={onSelect}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Track
        </Button>
      </form>
    </Form>
  );
}