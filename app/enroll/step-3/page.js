"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useFormContext } from "@/context/FormContext";
import { step3Schema } from "@/schemas/step3Schema";
import ProgressBar from "@/components/ProgressBar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Step3() {
  const router = useRouter();
  const { formData, updateFormData, isLoaded } = useFormContext();

  // Guard: Check if Step 2 was done
  useEffect(() => {
    if (isLoaded && !formData.subjects) router.push("/enroll/step-2");
  }, [isLoaded, formData, router]);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(step3Schema),
    defaultValues: formData
  });

  // Re-hydrate Select fields
  useEffect(() => {
     if(formData.paymentPlan) setValue("paymentPlan", formData.paymentPlan);
     if(formData.paymentMode) setValue("paymentMode", formData.paymentMode);
  }, [formData, setValue]);

  const onSubmit = (data) => {
    updateFormData(data);
    router.push("/enroll/review");
  };

  return (
    <div>
      <ProgressBar step={3} />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        
        {/* Address Card */}
        <Card>
          <CardHeader><CardTitle>Address Details</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>PIN Code</Label>
                <Input {...register("pinCode")} placeholder="123456" />
                {errors.pinCode && <p className="text-red-500 text-sm">{errors.pinCode.message}</p>}
              </div>
              <div>
                <Label>City</Label>
                <Input {...register("city")} />
                {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
              </div>
            </div>
            <div>
              <Label>State</Label>
              <Input {...register("state")} />
              {errors.state && <p className="text-red-500 text-sm">{errors.state.message}</p>}
            </div>
            <div>
              <Label>Address Line</Label>
              <Input {...register("address")} />
              {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
            </div>
          </CardContent>
        </Card>

        {/* Guardian Card */}
        <Card>
          <CardHeader><CardTitle>Guardian Details</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
                <Label>Guardian Name</Label>
                <Input {...register("guardianName")} />
                {errors.guardianName && <p className="text-red-500 text-sm">{errors.guardianName.message}</p>}
            </div>
            <div>
                <Label>Guardian Mobile</Label>
                <Input {...register("guardianMobile")} placeholder="9876543210" />
                {errors.guardianMobile && <p className="text-red-500 text-sm">{errors.guardianMobile.message}</p>}
            </div>
          </CardContent>
        </Card>

        {/* Payment Preferences */}
        <Card>
           <CardHeader><CardTitle>Payment Preference</CardTitle></CardHeader>
           <CardContent className="grid grid-cols-2 gap-4">
             <div>
               <Label>Plan</Label>
               <Select onValueChange={(v) => setValue("paymentPlan", v)} defaultValue={formData.paymentPlan}>
                 <SelectTrigger><SelectValue placeholder="Select Plan" /></SelectTrigger>
                 <SelectContent>
                   {["Quarterly", "Half-Yearly", "Annual"].map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                 </SelectContent>
               </Select>
               {errors.paymentPlan && <p className="text-red-500 text-sm">{errors.paymentPlan.message}</p>}
             </div>
             <div>
               <Label>Mode</Label>
               <Select onValueChange={(v) => setValue("paymentMode", v)} defaultValue={formData.paymentMode}>
                 <SelectTrigger><SelectValue placeholder="Select Mode" /></SelectTrigger>
                 <SelectContent>
                   {["UPI", "Card", "NetBanking"].map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                 </SelectContent>
               </Select>
               {errors.paymentMode && <p className="text-red-500 text-sm">{errors.paymentMode.message}</p>}
             </div>
           </CardContent>
        </Card>

        <div className="flex gap-3">
          <Button type="button" variant="outline" onClick={() => router.back()}>Back</Button>
          <Button type="submit" className="flex-1">Next: Review</Button>
        </div>
      </form>
    </div>
  );
}