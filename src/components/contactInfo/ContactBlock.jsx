import { InfoField } from "./InfoField";
import { SocialLinks } from "./SocialLinks";

export function ContactBlock({ data }) {
  return (
    <article className="flex flex-col self-start min-w-[240px] max-w-[620px] max-md:max-w-full">
      <div className="flex flex-col w-full max-md:max-w-full">
        <InfoField
          label={data.address.label}
          value={data.address.value}
          icon={data.address.icon}
        />
        <InfoField
          label={data.workHours.label}
          value={data.workHours.value}
          icon={data.workHours.icon}
        />
      </div>
      <div className="flex flex-wrap gap-5 items-start mt-5 w-full max-md:max-w-full">
        <InfoField
          label={data.email.label}
          value={data.email.value}
          icon={data.email.icon}
        />
        <InfoField
          label={data.phone.label}
          value={data.phone.value}
          icon={data.phone.icon}
          isUppercase
        />
      </div>
      <SocialLinks
        whatsAppLink={data.whatsAppLink}
        telegramLink={data.telegramLink}
      />
    </article>
  );
}
