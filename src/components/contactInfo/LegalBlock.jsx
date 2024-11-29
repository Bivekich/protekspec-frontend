import * as React from "react";
import { InfoField } from "./InfoField";
import { SocialLinks } from "./SocialLinks";

export function LegalBlock({ data }) {
  return (
    <article className="flex flex-col self-start min-w-[240px] max-w-[620px] max-md:max-w-full">
      <div className="flex flex-col w-full max-md:max-w-full">
        <InfoField label={data.legalAddress.label} value={data.legalAddress.value} icon={data.legalAddress.icon} />
    
      </div>
      <div className="flex flex-wrap gap-5 items-start mt-5 w-full max-md:max-w-full">
        <InfoField label={data.companyName.label} value={data.companyName.value} icon={data.companyName.icon} />
        <InfoField label={data.inn.label} value={data.inn.value} icon={data.inn.icon} />
        <InfoField label={data.ogrn.label} value={data.ogrn.value} icon={data.ogrn.icon} />
        <InfoField label={data.kpp.label} value={data.kpp.value} icon={data.kpp.icon} />

      </div>
   
    </article>
  );
}