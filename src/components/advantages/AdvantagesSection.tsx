import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '../common/Container';
import SectionTitle from '../aboutUs/SectionTitle';

const advantages = [
  {
    id: 1,
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/6b31bf6252c263485c2d0f51d40c8da00be5e8a55174a141df82119d8954b5ce?placeholderIfAbsent=true&apiKey=828c60f7e991488dbfb456f118122881",
    text: "Поставки осуществляются, несмотря на санкционную политику в отношении нашей страны"
  },
  {
    id: 2,
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/fc0f3f89a8eba0409764c659c660d9300c26eebc34f05cdfc2df3d7042a74340?placeholderIfAbsent=true&apiKey=828c60f7e991488dbfb456f118122881",
    text: "Постоянным клиентам индивидуальные условия"
  },
  {
    id: 3,
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/006cb747884cef110addefb497eadafa3d9dfde16038dc35d27ee9f4367bfb7a?placeholderIfAbsent=true&apiKey=828c60f7e991488dbfb456f118122881",
    text: "Оперативно доставляем по всей России и странам СНГ, используя все доступные специализированные доставки"
  },
  {
    id: 4,
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/d39762b3679cc29ec6fba2a7224afcf2f0659d79c4a633bbe6c62e90e4c7b495?placeholderIfAbsent=true&apiKey=828c60f7e991488dbfb456f118122881",
    text: "Разбираем и вникаем в каждый заказ"
  }
];

function AdvantageCard({ icon, text }) {
  return (
    <motion.article 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="flex flex-col flex-1 shrink px-2.5 py-5 basis-0 min-w-[240px] max-md:max-w-full"
    >
      <img 
        src={icon} 
        alt={text}
        loading="lazy"
        className="object-contain self-center aspect-square w-[78px]"
      />
      <p className="mt-5 text-xl text-center text-[#333]">
        {text}
      </p>
    </motion.article>
  );
}

export function AdvantagesSection() {
  return (
    <main className="flex flex-col w-full bg-[#F5F5F5] pb-[50px]">
      <Container className="px-5 md:px-20 py-10">
        <SectionTitle 
          iconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/e4fa9175160bd5796990f118f9c3251851affd2452bef799bf95c867fe82afc4?placeholderIfAbsent=true&apiKey=828c60f7e991488dbfb456f118122881"
          title="Наши преимущества"
        />
        
        <section className="flex flex-wrap gap-2.5 justify-center text-xl text-center py-10 h-full bg-white text-[#333] mt-10 rounded-lg shadow-lg">
          {advantages.map((advantage, index) => (
            <React.Fragment key={advantage.id}>
              <AdvantageCard 
                icon={advantage.icon}
                text={advantage.text}
              />
              {index < advantages.length - 1 && (
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/8e49b4860d5ca9285f80a1c81f105d018504d0af9a85868dd8c2e8004c374deb?placeholderIfAbsent=true&apiKey=828c60f7e991488dbfb456f118122881"
                  alt=""
                  className="object-contain shrink-0 w-0 aspect-[0] stroke-[1px] stroke-[color:var(--,#DADADA)]"
                />
              )}
            </React.Fragment>
          ))}
        </section>
      </Container>
    </main>
  );
}

export { AdvantagesSection as default };