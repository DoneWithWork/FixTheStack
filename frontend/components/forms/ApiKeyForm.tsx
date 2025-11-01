"use client";

import { createNewApiKey } from "@/app/actions/api-key";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { apiKeyTypes } from "@/db/schema/enums";
import { createApiKeySchema } from "@/lib/schemas";
import { Copy } from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

export function ApiKeyForm() {
  const form = useForm<z.infer<typeof createApiKeySchema>>({
    defaultValues: {
      label: "",
      type: "full_access",
    },
  });
  const router = useRouter();
  const [state, dispatch] = useActionState(createNewApiKey, {
    success: false,
    key: "",
  });
  const [isPending, startTransition] = useTransition();
  function onSubmit(data: z.infer<typeof createApiKeySchema>) {
    startTransition(() => {
      dispatch(data);
    });
  }
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (state.success && state.key) {
      queueMicrotask(() => setOpen(true));
    }
  }, [state.success, state.key]);

  useEffect(() => {
    if (state.success === false && state.error) {
      toast.error(state.error);
    }
  }, [state, router]);
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("API Key copied to clipboard");
  };
  return (
    <div className="h-full flex flex-col justify-between items-start">
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Api Key Created Successfully!</AlertDialogTitle>
            <AlertDialogDescription>
              Please store it securely as it will not be shown again!.
            </AlertDialogDescription>
            <div className="flex flex-row items-center gap-4 my-3">
              <Input
                readOnly
                value={state.key}
                className="font-semibold bg-zinc-800 border border-orange-500/20 text-zinc-100 placeholder-zinc-500 focus:ring-2 focus:ring-orange-500/50 focus:border-orange-400 rounded-xl transition-all"
              />
              <Button
                onClick={() => handleCopy(state.key!)}
                className="bg-orange-500 hover:bg-orange-600 text-white shadow-md shadow-orange-500/20 transition-all rounded-xl"
              >
                <Copy />
              </Button>
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              className="bg-red-500 hover:bg-red-600"
              onClick={() => {
                setOpen(false);
                router.push("/dashboard/api-keys");
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Card className="w-full  bg-zinc-900/80 border  shadow-lg  backdrop-blur-md rounded-2xl transition-all ">
        <CardHeader className="pb-2">
          <CardTitle className="text-orange-400 text-xl font-semibold tracking-wide">
            New API Key
          </CardTitle>
          <CardDescription className="text-zinc-400">
            Create and manage access for your FixTheStack integrations.
          </CardDescription>
        </CardHeader>
        <CardContent className="">
          <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup className="space-y-6">
              {/* Label Field */}
              <Controller
                name="label"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      htmlFor="form-rhf-demo-label"
                      className="text-zinc-300 font-medium"
                    >
                      API Key Label
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-demo-label"
                      aria-invalid={fieldState.invalid}
                      placeholder="e.g. IoT Dashboard Key"
                      autoComplete="off"
                      className="bg-zinc-800 border border-orange-500/20 text-zinc-100 placeholder-zinc-500 focus:ring-2 focus:ring-orange-500/50 focus:border-orange-400 rounded-xl transition-all"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Type Field */}
              <Controller
                name="type"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      htmlFor="form-rhf-demo-type"
                      className="text-zinc-300 font-medium"
                    >
                      API Key Type
                    </FieldLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full bg-zinc-800 border border-orange-500/20 text-zinc-100 focus:ring-2 focus:ring-orange-500/50 rounded-xl">
                        <SelectValue placeholder="Select type..." />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-900 border border-orange-500/30">
                        <SelectGroup>
                          <SelectLabel className="text-orange-400/80">
                            Access Types
                          </SelectLabel>
                          {apiKeyTypes.enumValues.map((type) => (
                            <SelectItem
                              key={type}
                              value={type}
                              className="text-zinc-200 focus:bg-orange-500/20 focus:text-orange-300"
                            >
                              {type.replace("_", " ")}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FieldDescription className="text-zinc-500">
                      Full Access can read/write data. Read-Only is limited to
                      reads.
                    </FieldDescription>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>

        <CardFooter className="flex justify-end gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => form.reset()}
            className="border-orange-500/30 text-orange-400 hover:bg-orange-500/10"
          >
            Reset
          </Button>
          <Button
            type="submit"
            disabled={isPending}
            form="form-rhf-demo"
            className="bg-orange-500 hover:bg-orange-600 text-white shadow-md shadow-orange-500/20 transition-all rounded-xl"
          >
            Submit
          </Button>
        </CardFooter>
      </Card>
      <Button
        onClick={() => router.back()}
        className="bg-orange-500 cursor-pointer text-md hover:bg-orange-600 text-white shadow-md shadow-orange-500/20 transition-all rounded-xl"
      >
        Back
      </Button>
    </div>
  );
}
