import Image from 'next/image';

export default function CIA() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center p-8 bg-sbc-primary">
      <div className="relative w-full h-[400px]">
        <Image
          src="/assets/ornament_bg.png"
          alt="ornament"
          className="object-cover w-full absolute top-0 z-0"
          width={500}
          height={500}   
        />
        <Image
          src="/assets/ornament_star.png"
          alt="ornament"
          className="h-20 w-20 absolute left-9 top-5 z-10"
          width={500}
          height={500}   
        />
        <Image
          src="/assets/ornament_bridge.png"
          alt="ornament"
          className="h-36 w-full absolute z-10"
          width={500}
          height={500}   
        />
      </div>
      <div className="max-w-4xl w-full">
        <div className="mb-8 w-full relative ">
          <Image
            src="/assets/title_cia.png"
            alt="CIA Banner"
            className="h-36 w-full"
            width={500}
            height={500}   
          />
        </div>
      </div>
    </main>
  );
}
