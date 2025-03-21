import Image from "next/image";
import { Form } from "@/components/cic/Form";

export const DesktopLayout = () => {
  return (
    <div className="hidden md:flex flex-col w-full overflow-hidden relative">
      <div className="absolute top-0 w-full h-full z-[0]">
        <Image
          src="/assets/fcec/ornament_bg.png"
          alt="ornament"
          className="object-cover w-full h-full opacity-50"
          fill
        />
      </div>
      <div className="absolute -bottom-[50rem] 2xl:-bottom-[55rem]  w-full h-full z-[0]">
        <Image
          src="/assets/fcec/ornament_bg.png"
          alt="ornament"
          className="object-cover w-full h-full opacity-50"
          fill
        />
      </div>
      <div className="flex flex-col items-center w-full h-[50vh] hero">
        <div className="relative mt-48">
          <Image
            src="/assets/ornament_star.png"
            alt="ornament"
            className="h-48 xl:h-[16rem] w-auto absolute -left-32 -top-20 z-[2]"
            width={500}
            height={500}
          />
          <Image
            src="/assets/cic/title_cic.svg"
            alt="FCEC Banner"
            className="h-64 xl:h-[20rem] 2xl:h-[24rem] w-auto relative z-[4]"
            width={500}
            height={500}
          />
        </div>
        <Image
          src="/assets/ornament_bridge.png"
          alt="ornament"
          className="h-auto w-full absolute top-[15%] lg:top-[13%] 2xl:top-[13%] z-[3]"
          width={500}
          height={500}
        />
      </div>
      <div className="mt-44 xl:mt-56 2xl:mt-76 relative w-full form-sbc">
        <div className="w-full h-full relative items-center flex flex-col">
          <div className="relative w-full flex justify-center">
            <Image
              src="/assets/cic/ornament_form_top.png"
              alt="ornament"
              className="h-[28rem] w-full z-[3]"
              width={500}
              height={500}
            />
            <Image
              src="/assets/title_form.png"
              alt="ornament"
              className="h-auto w-96 xl:w-[30rem] 2xl:w-[34rem] absolute top-2/3 -translate-y-1/2 z-[4]"
              width={500}
              height={500}
            />
          </div>
          <div className="w-full -mt-4 flex justify-center bg-cic-secondary px-6 z-[4]">
            <div className="relative w-full max-w-[60rem] xl:max-w-[90rem] 2xl:max-w-[90rem] bg-cic-third p-8 rounded-[20px] overflow-hidden">
              <Image
                src="/assets/ornament_form_bg.png"
                alt="ornament"
                className="absolute -bottom-[1rem] -left-2 w-full z-[0]"
                width={500}
                height={500}
              />
              <div className="relative z-[3]">
                <Form />
              </div>
            </div>
          </div>
          <Image
            src="/assets/cic/ornament_form_bot.png"
            alt="ornament"
            className="w-full h-[20rem] z-[3] -mt-3"
            width={500}
            height={500}
          />
        </div>
      </div>
      <div className="w-full overflow-hidden"></div>
    </div>
  );
};
