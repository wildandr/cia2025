import Image from "next/image";
import { Form } from "@/components/sbc/Form";

export const MobileLayout = () => {
  return (
    <div className="md:hidden w-full overflow-hidden">
      <div className="">
        <div className="relative w-full flex justify-center h-[70vh] hero">
          <Image
            src="/assets/mobile/sbc/ornament_bg.png"
            alt="ornament"
            className="h-full w-full absolute top-0 z-[1]"
            width={500}
            height={500}
          />
          <div className="relative mt-32">
            <Image
              src="/assets/ornament_star.png"
              alt="ornament"
              className="h-28 w-28 custom-580:h-36 custom-580:w-36 absolute -left-8 -top-8 z-[2]"
              width={500}
              height={500}
            />
            <Image
              src="/assets/sbc/title_sbc.png"
              alt="SBC Banner"
              className="h-36 custom-580:h-48 w-auto relative z-[4]"
              width={500}
              height={500}
            />
          </div>
          <Image
            src="/assets/ornament_bridge.png"
            alt="ornament"
            className="h-auto w-full absolute bottom-0 z-[3]"
            width={500}
            height={500}
          />
        </div>
        <div className="-mt-32 relative w-full form-sbc overflow-hidden">
          <div className="w-full h-full relative items-center flex flex-col">
            <Image
              src="/assets/mobile/sbc/ornament_form_top.png"
              alt="ornament"
              className="h-48 w-full z-[3]"
              width={500}
              height={500}
            />
            <Image
              src="/assets/title_form.png"
              alt="ornament"
              className="h-auto w-60 custom-580:w-64 absolute mt-16 z-[4]"
              width={500}
              height={500}
            />
            <div className="w-full -mt-3 flex justify-center bg-sbc-secondary px-6 z-[4]">
              <div className="relative w-full bg-sbc-third p-8 rounded-[20px] overflow-hidden">
                <Image
                  src="/assets/ornament_form_bg.png"
                  alt="ornament"
                  className="absolute bottom-0  object-contain z-[0]"
                  width={500}
                  height={500}
                />
                <div className="relative z-[3]">
                  <Form />
                </div>
              </div>
            </div>
            <Image
              src="/assets/mobile/sbc/ornament_form_bot.png"
              alt="ornament"
              className="h-36 w-full z-[3] -mt-3"
              width={500}
              height={500}
            />
          </div>
          <Image
            src="/assets/mobile/sbc/ornament_bg.png"
            alt="ornament"
            className="w-full absolute -bottom-[30rem] custom-580:-bottom-[50rem] z-[1]"
            width={500}
            height={500}
          />
        </div>
      </div>
    </div>
  );
};
