import Link from "next/link";
import { ContainerScroll } from "./ui/container-scroll-animation";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-black w-full h-full overflow-hidden">
      {/* {Home} --login  */}
                <div className="flex flex-col overflow-hidden">
                <ContainerScroll
                  titleComponent={
                    <>
                      <h1 className="text-4xl font-semibold text-white">
                        Next Gen The Power Of <br />
                        <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                        All IN ONE(Artificial Intelligence)
                        </span>
                      </h1>
                    </>
                  }
                >
                  <Image
                    src={`/img1.png`}
                    alt="hero"
                    height={720}
                    width={1400}
                    className="mx-auto rounded-2xl object-cover h-full object-left-top"
                    draggable={false}
                  />
                </ContainerScroll>
                </div>
                <div className="flex justify-center items-center py-10 space-x-4 shadow-md">
                    <div className="btn-group" role="group" aria-label="Basic example">
                    <Link href="/login" className="btn btn-dark">Login</Link>
                    <Link href="/signup" className="btn btn-dark">Signup</Link>
                    </div>
                </div>
    </div>
  );
}
