import Image from "next/image";

export default function SBC() {
  return (
    <main className="relative min-h-screen flex flex-col items-center bg-sbc-primary">
      <div className="md:hidden w-full  overflow-hidden">
        <div className="">
          <div className="relative w-full flex justify-center h-[70vh] hero">
            <Image
              src="/assets/mobile/ornament_bg.png"
              alt="ornament"
              className="h-full w-full  absolute top-0 z-[1]"
              width={500}
              height={500}
            />

            <div className="relative mt-32">
              <Image
                src="/assets/ornament_star.png"
                alt="ornament"
                className="h-28 w-28  custom-580:h-36  custom-580:w-36 absolute -left-8 -top-8 z-[2]"
                width={500}
                height={500}
              />
              <Image
                src="/assets/title_sbc.png"
                alt="SBC Banner"
                className="h-36 custom-580:h-48 w-auto relative z-[4]"
                width={500}
                height={500}
              />
            </div>

            <Image
              src="/assets/mobile/ornament_bridge.png"
              alt="ornament"
              className="h-auto w-full  absolute bottom-0 z-[3]"
              width={500}
              height={500}
            />
          </div>
          <div className="-mt-32 relative w-full form-sbc overflow-hidden">
            <div className="w-full h-full relative items-center flex flex-col">
              <Image
                src="/assets/mobile/ornament_form_sbc_top.png"
                alt="ornament"
                className="h-48 w-full z-[3]"
                width={500}
                height={500}
              />
              <Image
                src="/assets/mobile/title_form.png"
                alt="ornament"
                className="h-auto w-60 custom-580:w-64 absolute mt-16 z-[4]"
                width={500}
                height={500}
              />
              <div className=" w-full -mt-3 flex justify-center bg-sbc-secondary px-6 z-[4]">
                <div className="relative w-full  bg-sbc-third p-8 rounded-[20px] overflow-hidden">
                  <Image
                    src="/assets/mobile/ornament_bg_bridge.png"
                    alt="ornament"
                    className="absolute inset-0 opacity-5 object-contain  z-[0]"
                    width={500}
                    height={500}
                  />

                  <div className="relative z-[3]">
                    <p>something</p>
                    <p>something</p>
                    <p>something</p>
                    <p>something</p>
                    <p>something</p>
                    <p>something</p>
                  </div>
                </div>
              </div>
              <Image
                src="/assets/mobile/ornament_form_sbc_bot.png"
                alt="ornament"
                className="h-36 w-full z-[3] -mt-3"
                width={500}
                height={500}
              />
            </div>
            <Image
              src="/assets/mobile/ornament_bg.png"
              alt="ornament"
              className=" w-full absolute -bottom-[30rem] custom-580:-bottom-[50rem] z-[1]"
              width={500}
              height={500}
            />
          </div>
        </div>
      </div>
      {/* Desktop version placeholder - will be visible only on md and larger screens */}
      <div className="hidden md:flex flex-col w-full overflow-hidden relative">
        <div className="absolute top-0 w-full h-full z-[0]">
          <Image
            src="/assets/ornament_bg.png"
            alt="ornament"
            className="object-cover w-full h-full opacity-50 "
            fill
          />
        </div>
        <div className="absolute -bottom-[20rem] w-full h-full z-[0]">
          <Image
            src="/assets/ornament_bg.png"
            alt="ornament"
            className="object-cover w-full h-full opacity-50 "
            fill
          />
        </div>

        <div className="flex flex-col items-center w-full h-[50vh] hero">
          <div className="relative mt-48">
            <Image
              src="/assets/ornament_star.png"
              alt="ornament"
              className="h-48  xl:h-[16rem] w-auto absolute -left-32 -top-20 z-[2]"
              width={500}
              height={500}
            />
            <Image
              src="/assets/title_sbc.png"
              alt="SBC Banner"
              className="h-64  xl:h-[20rem]  2xl:h-[24rem] w-auto relative z-[4]"
              width={500}
              height={500}
            />
          </div>
          <Image
            src="/assets/ornament_bridge.png"
            alt="ornament"
            className="h-auto w-full absolute top-[30%] lg:top-1/4 z-[3]"
            width={500}
            height={500}
          />
        </div>
        <div className="mt-44 xl:mt-56 2xl:mt-76 relative w-full form-sbc ">
          <div className="w-full h-full relative items-center flex flex-col">
            <div className="relative w-full flex justify-center">
              <Image
                src="/assets/ornament_form_sbc_top.png"
                alt="ornament"
                className="h-[28rem] w-full z-[3]"
                width={500}
                height={500}
              />
              <Image
                src="/assets/mobile/title_form.png"
                alt="ornament"
                className="h-auto w-96 xl:w-[30rem]  2xl:w-[34rem] absolute top-2/3 -translate-y-1/2 z-[4]"
                width={500}
                height={500}
              />
            </div>
            <div className=" w-full -mt-4 flex justify-center bg-sbc-secondary px-6 z-[4]">
              <div className="relative w-full max-w-[60rem] xl:max-w-[90rem]  2xl:max-w-[90rem]   bg-sbc-third p-8 rounded-[20px] overflow-hidden">
                <Image
                  src="/assets/mobile/ornament_bg_bridge.png"
                  alt="ornament"
                  className="absolute inset-0 opacity-5 object-contain  z-[0]"
                  width={500}
                  height={500}
                />

                <div className="relative z-[3]">
                  <p className="text-lg">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Curabitur ipsum turpis, interdum sit amet leo et, pharetra
                    venenatis sapien. Duis eget tellus sed neque ullamcorper
                    commodo. Praesent turpis nibh, faucibus a tempus imperdiet,
                    faucibus sed tellus. Pellentesque dictum interdum massa, sed
                    luctus nisl consequat non. Phasellus vitae neque diam.
                    Suspendisse potenti. Integer pellentesque ex pharetra
                    pellentesque pellentesque. Suspendisse vitae tempor augue,
                    eget ornare odio. Aliquam at orci eros. Proin molestie
                    dapibus dolor eget consequat. Cras nibh nunc, imperdiet sed
                    lobortis eu, ultricies id nisl. Quisque eu massa ut leo
                    sodales iaculis. Fusce semper, ligula et finibus eleifend,
                    urna libero pharetra metus, ac egestas lacus tortor eu
                    dolor. Morbi rhoncus interdum turpis, consequat pellentesque
                    ipsum ultrices sed. Praesent facilisis, ex quis varius
                    vestibulum, diam magna accumsan tortor, vel ultrices diam
                    sem a dui. Sed tincidunt non nulla ac euismod. Nulla ac
                    porta diam. Etiam ac turpis et purus tristique ultricies
                    vitae non odio.
                  </p>
                  <p className="text-lg">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Curabitur ipsum turpis, interdum sit amet leo et, pharetra
                    venenatis sapien. Duis eget tellus sed neque ullamcorper
                    commodo. Praesent turpis nibh, faucibus a tempus imperdiet,
                    faucibus sed tellus. Pellentesque dictum interdum massa, sed
                    luctus nisl consequat non. Phasellus vitae neque diam.
                    Suspendisse potenti. Integer pellentesque ex pharetra
                    pellentesque pellentesque. Suspendisse vitae tempor augue,
                    eget ornare odio. Aliquam at orci eros. Proin molestie
                    dapibus dolor eget consequat. Cras nibh nunc, imperdiet sed
                    lobortis eu, ultricies id nisl. Quisque eu massa ut leo
                    sodales iaculis. Fusce semper, ligula et finibus eleifend,
                    urna libero pharetra metus, ac egestas lacus tortor eu
                    dolor. Morbi rhoncus interdum turpis, consequat pellentesque
                    ipsum ultrices sed. Praesent facilisis, ex quis varius
                    vestibulum, diam magna accumsan tortor, vel ultrices diam
                    sem a dui. Sed tincidunt non nulla ac euismod. Nulla ac
                    porta diam. Etiam ac turpis et purus tristique ultricies
                    vitae non odio.
                  </p>
                </div>
              </div>
            </div>
            <Image
              src="/assets/ornament_form_sbc_bot.png"
              alt="ornament"
              className="w-full h-[20rem] z-[3] -mt-3"
              width={500}
              height={500}
            />
          </div>
        </div>
        <div className="w-full overflow-hidden"></div>
      </div>
    </main>
  );
}
