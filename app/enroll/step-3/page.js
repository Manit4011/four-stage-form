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

  if (!isLoaded) return null;

  return (
    // 1. Page Container
    <div className="min-h-screen  flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      
      {/* 2. Main Wrapper */}
      <div className="w-full max-w-xl space-y-6">
        
        {/* Top Section: Progress & Title (Outside the individual cards for cleaner look) */}
        <div className=" p-8 rounded-xl shadow-lg border border-gray-100 space-y-6">
          <ProgressBar step={3} />
          
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight ">Final Details</h2>
            <p className="text-sm text-gray-500 mt-2">
              Address information and payment preferences.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            {/* Address Card - Styled as a flat section */}
            <Card className="shadow-none border-gray-200 ">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold ">Address Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="">PIN Code</Label>
                    <Input {...register("pinCode")} placeholder="123456" className="bg-white h-10" />
                    {errors.pinCode && <p className="text-red-500 text-xs mt-1">{errors.pinCode.message}</p>}
                  </div>
                  <div className="space-y-1.5">
                    <Label className="">City</Label>
                    <Input {...register("city")} className="bg-white h-10" />
                    {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label className="">State</Label>
                  <Input {...register("state")} className="bg-white h-10" />
                  {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state.message}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label className="">Address Line</Label>
                  <Input {...register("address")} placeholder="House No, Street, Landmark" className="bg-white h-10" />
                  {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
                </div>
              </CardContent>
            </Card>

            {/* Guardian Card */}
            <Card className="shadow-none border-gray-200 ">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold ">Guardian Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                        <Label className="">Guardian Name</Label>
                        <Input {...register("guardianName")} className="bg-white h-10" />
                        {errors.guardianName && <p className="text-red-500 text-xs mt-1">{errors.guardianName.message}</p>}
                    </div>
                    <div className="space-y-1.5">
                        <Label className="">Guardian Mobile</Label>
                        <Input {...register("guardianMobile")} placeholder="9876543210" className="bg-white h-10" />
                        {errors.guardianMobile && <p className="text-red-500 text-xs mt-1">{errors.guardianMobile.message}</p>}
                    </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Preferences */}
            <Card className="shadow-none border-gray-200 ">
               <CardHeader className="pb-3">
                   <CardTitle className="text-base font-semibold ">Payment Preference</CardTitle>
               </CardHeader>
               <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="space-y-1.5">
                   <Label className="">Plan Duration</Label>
                   <Select onValueChange={(v) => setValue("paymentPlan", v)} defaultValue={formData.paymentPlan}>
                     <SelectTrigger className="bg-white h-10"><SelectValue placeholder="Select Plan" /></SelectTrigger>
                     <SelectContent>
                       {["Quarterly", "Half-Yearly", "Annual"].map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                     </SelectContent>
                   </Select>
                   {errors.paymentPlan && <p className="text-red-500 text-xs mt-1">{errors.paymentPlan.message}</p>}
                 </div>
                 <div className="space-y-1.5">
                   <Label className="">Payment Mode</Label>
                   <Select onValueChange={(v) => setValue("paymentMode", v)} defaultValue={formData.paymentMode}>
                     <SelectTrigger className="bg-white h-10"><SelectValue placeholder="Select Mode" /></SelectTrigger>
                     <SelectContent>
                       {["UPI", "Card", "NetBanking"].map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                     </SelectContent>
                   </Select>
                   {errors.paymentMode && <p className="text-red-500 text-xs mt-1">{errors.paymentMode.message}</p>}
                 </div>
               </CardContent>
            </Card>

            <div className="flex gap-4 pt-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => router.back()}
                className="w-1/3 h-11"
              >
                Back
              </Button>
              <Button 
                type="submit" 
                className="flex-1 h-11"
              >
                Review & Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}