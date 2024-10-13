import React, { useState } from "react";

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: "John Fang",
      website: "wordfaang.com",
      review:
        "Suspendisse ultrices at diam lectus nullam. Nisl, sagittis viverra enim erat tortor ultricies massa turpis. Arcu pulvinar aenean nam laoreet nulla.",
      image:
        "https://s3-alpha-sig.figma.com/img/515d/ff9e/da4d74b6ffcfa490d831317ff20eb608?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=RIScfyzckrq5d4~uJsJ0tWeS~TKl85gSiO~ZlEy5Z1DxKvBL6VFSBYHTvMAaqSX-CsLcV9GLhoEKdiyw7huIPqZ5~HOK9po6fzq4KA-t5pb0-gUNpPxIeXdrggIUURcDM6rIoJik8ui9zScFql3uhmeLacpQU6X4wEeP4nC6RHUwGszqtv0TB06WjpFHOg3IsFsqzEKiYhbN~L674b8sa0UmyyyME6an6n-LYNbghk9UltRaZ~VtR9-P-Z4lgxbOrYS0PvhPssRgKXKKTA7rc6FTpFDtoB8xvkB1joKMNJmOJEnkF5H-nLxfqpvboUS~-~7pPUZ~c2-px3wE~clPwQ__",
    },
    {
      name: "Jane Doe",
      website: "janedoe.com",
      review:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent commodo cursus magna, vel scelerisque nisl consectetur.",
      image: "https://via.placeholder.com/80",
    },
    {
      name: "Alice Smith",
      website: "alicesmith.com",
      review:
        "Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Donec id elit non mi porta gravida at eget metus.",
      image: "https://via.placeholder.com/80",
    },
    {
      name: "Alice Smith",
      website: "alicesmith.com",
      review:
        "Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Donec id elit non mi porta gravida at eget metus.",
      image: "https://via.placeholder.com/80",
    },
  ];

  const handlePrev = () => {
    setCurrentIndex(
      currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex(
      currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1
    );
  };

  const goToSlide = (index: React.SetStateAction<number>) => {
    setCurrentIndex(index);
  };
  return (
    <div className=" m-auto w-[1120px] p-3">
      <div className="flex pt-3 justify-between pb-20">
        <div className="flex gap-2">
          <div className="w-5 h-5 bg-[#9900FF] rounded-full"></div>
          <div className="w-5 h-9 bg-[#FF0099] rounded-full "></div>
        </div>
        <div className="">
          <button className="bg-[#9900FF] rounded-2xl text-white w-32 h-10 hover:bg-[#9933CC] motion-safe:hover:scale-110 transition-colors ">
            Profile
          </button>
          <button className="bg-[#9900FF] rounded-2xl text-white w-32 h-10 hover:bg-[#9933CC] motion-safe:hover:scale-110 transition-colors ml-6 ">
            Logout
          </button>
        </div>
      </div>

      <div className="flex">
        <div className=" w-[50%]">
          <h1 className="font-semibold text-[80px] ">
            Save your data storage here.
          </h1>
<p className="w-[390px] text-[19px] pt-5 pb-8">
            Data Warehouse is a data storage area that has been tested for
            security, so you can store your data here safely but not be afraid
            of being stolen by others.
          </p>
          <button className="bg-[#9900FF] text-white rounded-2xl w-32 h-10 transition-colors hover:bg-[#9933CC] ">
            Learn more
          </button>
        </div>
        <div>
          <img
            className="w-[550px] h-[300px] mt-32 "
            src="https://s3-alpha-sig.figma.com/img/b141/5dac/039cbccbb3a55ae069a3291f512521c8?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=If7mtr8N7j3Zkflie7jEhwHanbNCLCdOj4BT~~zIa~k8SyQFWc~jC8hiTMtS-oHea5ZirkpV01exnEoZxO021FgtPuPVrUpqHUZhnoCIuUF~4OCDNaAd0TZH8lylmLC6ko0NOHpA3a7kCkmRHOCqNXqy88QS~owC8sRPpRGWROct58hYLqt7RRYPtt8D65UPxRU9Q~PPhvG6kk0v1u6sm33nMsrK0l0w4MkCT5hSvLEvem1v2he9xDybrKZfcUA0JfxGwG7kamXq2pe2yYBAmYmYK4maWo9m-dsr2PIDTcL2BjU0QzdQgj9hIi2X6Xh4p4VxhB7nvZFs57LHg7A10g__"
            alt=""
          />
        </div>
      </div>

      <h2 className="text-center font-bold text-[48px] pt-16">Features</h2>
      <p className=" pt-5 m-auto w-[40%] text-center ">
        Some of the features and advantages that we provide for those of you who
        store data in this Data Warehouse.
      </p>
      <div>
        <div className="flex justify-between pt-8">
          <div className=" w-[47%] flex gap-5">
            <div>
              <img
                className="pt-7"
                src="https://s3-alpha-sig.figma.com/img/de39/7ca5/7ba1dda1fab4af707def69fa8e4d2a0b?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=a0kg0JnJpVSGCXujgw-oDR7hfv2kDgNWNkYbhqVQOG2zS0X1lA9mpOveSdgT5N2S~hOrCgCflwC7R5x4NG47VfKPGJ7F4Iv678VOe3rCcCV~LeEHKV5Cy6gCLVjUPkdpfgVlUBkVEunTLSmaaZXJlVXKDnxAabJjq~if~nwJl8eEBP4KLnrSbm2449ihj8NDqe6M3ma9DZdD4WUggaM7VBjXlQYeXWLVppJN~eKB~dKTo~jZDnF7I4BT48b1K6ikBxMAIxAHS0MOm5grMjwnTtf~2tRcX8d-6vUC4p5-ck1rdUXjo~EJESMMdnnUloi8bj6c~c0H5sss9Wbrj6SUNg__"
                alt=""
              />
            </div>
            <div>
              <h2 className="font-semibold text-center m-2 text-[20px]">
                Search Data
              </h2>
              <p className="w-[220px] text-[#4B5D68] pb-3">
                Don’t worry if your data is very large, the Data Warehoue
                provides a search engine, which is useful for making it easier
                to find data effectively saving time.
              </p>
              <button className="font-medium">Learn more &rarr;</button>
            </div>
          </div>

          <div className="w-[45%] flex gap-5">
            <div>
              <img
                className="pt-7"
src="https://s3-alpha-sig.figma.com/img/4848/bd8b/6441ecd1919c84f36a65eabdc8138a2c?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=SKgemvz2fq15Dkg7UEfLtb-eeqrwjpeARoe74~jQpdqBtejjnr5uEVC5jJTQMpsBVicK0u9P5gnZrWZRq67unqz~prO8qNAmh6Zo02loTZfmrllT-4zVfUeo7ifUPS-GIVZQ39HKoTLPHXubcyFKCkM35WYr6S9d5kxHr2AqTNVxNYpL3MKwt~WfshCmHGDZBBkYtIFBCEyHFqXYFUsAWQzpnFutX705VnxUVr79DBmLgROr3Z-V6gj1-OXVoVKUcSb6JiXcXuzpyEJksDkpxoSkEi-GxYiO7J4TQbAg3~t4DbIqM30rPJwsPAo1XskdsBsVKZ1T21D~uAyx81jq~A__"
                alt=""
              />
            </div>
            <div>
              <h2 className="font-semibold text-center m-2 text-[20px]">
                24 Hours Access
              </h2>
              <p className="w-[220px] text-[#4B5D68] pb-3">
                Access is given 24 hours a full morning to night and meet again
                in the morning, giving you comfort when you need data when
                urgent.
              </p>
              <button className="font-medium">Learn more &rarr;</button>
            </div>
          </div>
        </div>
        <div className="flex justify-between pt-8">
          <div className=" w-[47%] flex gap-5">
            <div>
              <img
                className="pt-7"
                src="https://s3-alpha-sig.figma.com/img/cc12/c28f/2f3e743d08b2c66de2a7a23d4228df91?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=aqc1v4A4wdUx87mhLpihWGtzAR~7-jt4UqPHPZhhgLf6Xa5Co~c2tjLeFZv5ucuSTWAOzQ~g30tWWyvIAvZgAvnchJ3aP7y56QvuLuz5BGRtw~MgiYeK6XiyjiFyvDqZW6tKrbuAHdg2ltnmb5v814LAsI~GDlb7oix1vZ59OAx~VIQbgi4C2RyqQ~jqGMf~i5YhBitBoFuPcGdO7xOiqvObJxRFbPSE2FchJZ-aYCWy2Qck5vE-H-Fbl7oYxuAlz8s5lKIIBOw1ZvpFskPOPyPtL3nAKEpwMmkOQ-axqcnTj6~0AOTQ1PoXUnxC1AbtPOtDGeMfzhfCMF8BivGvKQ__"
                alt=""
              />
            </div>
            <div>
              <h2 className="font-semibold text-center m-2 text-[20px]">
                Print Out
              </h2>
              <p className="w-[220px] text-[#4B5D68] pb-3">
                Print out service gives you convenience if someday you need
                print data, just edit it all and just print it.
              </p>
              <button className="font-medium">Learn more &rarr;</button>
            </div>
          </div>

          <div className="w-[45%] flex gap-5">
            <div>
              <img
                className="pt-7"
                src="https://s3-alpha-sig.figma.com/img/9b0c/ad9e/af78d7add1e7940c7af1b7f896b757e0?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=WTiS9hADpkyTIoyWqMvTqS4EW49u0SKVy4Mk9heVXCUd313j-urIGxHOAHNiMBGS2vBNwDYU1vTRtU9iCvme~lyB9l~fG9eMMuT0ABICXSWl8ReiZLRHz2u~w4wg2PaYSUZJJkBoDvwIPb62XWio6N6xlggnm0C2nPmBFacQQIjhGV28M4QFPdcneWpcoRg~XDWcBgSBCOa7NhtwEMyxQsX6Pja-aRsshVWCGxOxsxLvT1WAWoiS1YOIRGfmVJaovTNLu6zBtQ6hrXDQjOCKXP5QS0fy-qZnds4OP49zyTuKGQoxWLox2dGKgn0CtjxJCKZK3f9~CoHHugiC2IWXZw__"
                alt=""
              />
            </div>
            <div>
<h2 className="font-semibold text-center m-2 text-[20px]">
                Security Code
              </h2>
              <p className="w-[220px] text-[#4B5D68] pb-3">
                Data Security is one of our best facilities. Allows for your
                files to be safer. The file can be secured with a code or
                password that you created, so only you can open the file.
              </p>
              <button className="font-medium">Learn more &rarr;</button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#9900FF] h-[700px] rounded-[30px] mt-20 m-auto ">
        <h1 className="text-white text-[40px] font-semibold m-[80px] pt-14">
          Testimonials
        </h1>
        <div className="flex pl-[60px] gap-2">

          <span
            onClick={handlePrev}
            className="text-white text-[50px] cursor-pointer pt-32 hover:text-red-500 transition-colors"
          >
            &#x2190;
          </span>


          <div className="w-[85%] bg-white h-[350px] rounded-2xl flex pl-32 pt-16">
            <div>
              <img
                className="rounded-full"
                src={testimonials[currentIndex].image}
                alt={testimonials[currentIndex].name}
              />
            </div>
            <div className="w-[50%] ml-[50px] pt-14">
              <h2 className="font-semibold text-[20px] pb-1">
                {testimonials[currentIndex].name}
              </h2>
              <span className="text-[#9900FF] cursor-pointer">
                {testimonials[currentIndex].website}
              </span>
              <p className="pt-1 text-[18px] text-[#4B5D68] font-semibold">
                {testimonials[currentIndex].review}
              </p>
            </div>
          </div>


          <span
            onClick={handleNext}
            className="text-white text-[50px] cursor-pointer pt-32 hover:text-red-500 transition-colors"
          >
            &#x2192;
          </span>
        </div>


        <div className="flex justify-center mt-8">
          {testimonials.map((_, index) => (
            <div
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 mx-2 rounded-full cursor-pointer ${
                currentIndex === index ? "bg-[#cf38b6]" : "bg-[#ffffff]"
              }`}
            />
          ))}
        </div>
      </div>
      <hr className="h-[2px] bg-[#b88bf6] w-full mt-10" />
      <div className="mt-16 flex justify-between">
        <div>
          <div className="flex gap-6">
            <div className="gap-2 flex cursor-pointer">
              <div className="w-5 h-5 bg-[#9900FF] rounded-full"></div>
              <div className="w-5 h-9 bg-[#FF0099] rounded-full "></div>
            </div>
            <h2 className="font-semibold text-[24px] cursor-pointer">
              DataWarehouse
            </h2>
          </div>
<div className="pt-8 cursor-pointer">
            <p className="text-[18px] font-semibold ">Warehouse Society, 234</p>
            <p className="text-[18px] font-semibold">
              Bahagia Ave Street PRBW 29281
            </p>
          </div>
          <div className="pt-8 cursor-pointer">
            <p className="text-[16px]">info@warehouse.project </p>
            <p className="text-[16px]">1-232-3434 (Main)</p>
          </div>
        </div>
        <div className="">
          <h3 className="font-semibold pb-5">About</h3>
          <div className="">
            <p>Profile</p>
            <p>Features</p>
            <p>Careers</p>
            <p>DW News</p>
          </div>
        </div>
        <div className="">
          <h3 className="font-semibold pb-5">Help</h3>
          <div>
            <p>Support</p>
            <p>Sign up</p>
            <p>Guide</p>
            <p>Reports</p>
            <p>Q&A</p>
          </div>
        </div>
        <div>
          <h3 className="font-semibold pb-5">Social Media</h3>
          <div className="flex gap-4">
            <div className="bg-[#d0d1ec] w-12 h-12 rounded-full cursor-pointer hover:bg-slate-500 transition-colors"></div>
            <div className="bg-[#d0d1ec] w-12 h-12 rounded-full cursor-pointer hover:bg-slate-500 transition-colors"></div>
            <div className="bg-[#d0d1ec] w-12 h-12 rounded-full cursor-pointer hover:bg-slate-500 transition-colors"></div>
          </div>
        </div>
      </div>
      <div className="pt-28 flex justify-between mb-20">
        <div>
          <p className="text-[14px]">
            © Datawarehouse™, 2020. All rights reserved.
          </p>
          <p className="text-[14px]">Company Registration Number: 21479524.</p>
        </div>
        <div>
          <img
            className="w-[50px] h-[40px] rounded-full cursor-pointer motion-safe:hover:scale-110"
            src="https://banner2.cleanpng.com/20180711/vou/kisspng-computer-icons-online-chat-text-messaging-5b46b8db37ee51.2862882515313614992291.jpg"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Home;