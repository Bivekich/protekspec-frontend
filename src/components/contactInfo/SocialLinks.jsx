import * as React from "react";

export function SocialLinks({ whatsAppLink, telegramLink }) {
  const socialLinks = [
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/60221597df6e43e83a3baf4e5c85701c8c106a01275fd69e7d319d6d26f0787d",
      alt: "WhatsApp",
      link: whatsAppLink,
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/67f404e93a246e8abc12d854486e8f36d9c900bdc4edd5feb4c6485699fe6db0",
      alt: "Telegram",
      link: telegramLink,
    },
  ];

  return (
    <div className="flex flex-col self-start mt-5 min-h-[74px]">
      <p className="text-base text-[#828282]">Мессенджеры</p>
      <div className="flex gap-5 items-start self-start mt-2.5">
        {socialLinks.map(
          (link, index) =>
            link.link && (
              <a
                key={index}
                href={link.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex overflow-hidden gap-2.5 justify-center items-center w-10 h-10 bg-zinc-900 min-h-[40px] rounded-[200px] hover:bg-black/70 hover:text-white hover:scale-105 transition-all duration-300"
              >
                <img
                  loading="lazy"
                  src={link.icon}
                  alt={link.alt}
                  className="object-contain self-stretch my-auto aspect-square w-[22px]"
                />
              </a>
            )
        )}
      </div>
    </div>
  );
}
