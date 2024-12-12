import { ReactTyped } from "react-typed";

export default function LandingPage() {
  return (
    <main className="w-full flex gap-8 justify-between">
      <section className="w-full lg:w-[40vw]">
        <h1 className="text-4xl md:text-5xl uppercase font-bold">
          <span className="text-primary">Verify</span> your Academic records
          with{" "}
          <div style={{ content: "transparency" }}>
            <ReactTyped
              className="text-primary"
              strings={["ease.", "transparency.", "efficiency."]}
              typeSpeed={80}
              loop
              backDelay={950}
              showCursor={true}
            />
          </div>
        </h1>

        <p className="my-8 text-gray-700">
          Introducing a decenteralized academic records storing system based on{" "}
          <a
            href="https://ethereum.org/en/developers/docs/"
            className="text-blue-400"
          >
            Etherium
          </a>
          . Institutes can upload their students data and courses attended by
          them. This records is decentralized and can be verified from anywhere,
          by anyone.
        </p>

        <a
          className="w-fit flex gap-2 text-white px-3 py-2 relative bg-blue-500 rounded hover:bg-blue-800"
          href="https://github.com/Akshat-1403/DARS-2.0"
        >
          Know More{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
            />
          </svg>
        </a>
      </section>

      <img
        className="w-[36vw] hidden lg:block"
        src="/moi_landingPage.svg"
        alt="landing page"
      />
    </main>
  );
}
