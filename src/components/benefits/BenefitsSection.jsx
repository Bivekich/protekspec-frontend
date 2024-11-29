import * as React from "react";
import { BenefitItem } from "./data/components/BenefitItem";
import { benefitsData } from "./data/benefitsData";
import { Container } from "../common/Container";

export function BenefitsSection() {
  return (
    <section className="flex flex-col justify-center w-full relative -mt-[100px]">
      <div className="absolute -top-10 h-20"/>
      <Container className="px-5 md:px-20">
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-0 w-full bg-[#FFFFFF] rounded-lg shadow-lg z-[10]">
          {benefitsData.map((benefit, index) => (
            <BenefitItem 
              key={index} 
              {...benefit} 
              className={index === 4 ? "col-span-2 lg:col-span-1" : ""} 
            />
          ))}
        </div>
      </Container>
    </section>
  );
}