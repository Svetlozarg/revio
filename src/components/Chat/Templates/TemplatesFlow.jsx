import { useState } from 'react';

const ThemplatesFlow = () => {
  const [active, setActive] = useState(1);

  // Template Data
  const data = {
    title: [
      'Feedback',
      'Special Discount',
      'Happy Birthday',
      'Holiday',
      'Subscription',
      'Re-engagement',
    ],
    body: [
      'Hi [First_Name], huge thanks for shopping with [Store_Name]. We value your feedback, and we would love if you could complete a quick survey about your experience: [Survey_Link]',
      'Hi [First_Name]! Save 20% on all new arrivals at [Store_Name] with code SUMMER20: [Store_Link]',
      'Happy birthday, [First_Name]! To celebrate, we’re giving you a 25% birthday discount with the code BDAY, valid for one month: [Store_Link]',
      'Hi [First_Name],Get ahead of the holiday rush with our Black Friday/Cyber Monday sale. Get 25% off our entire store.Use code [Santa20] at [Store_Link].',
      'Hi [First_Name],Earn 10% off your next purchase by signing up for our Subscribe & Save offer! Check out our website for more details [Store_Link].',
      'Hi [First_Name],Long time no see! It’s been a while since you placed your last order for [Product]. We’d love to offer you 20% to place a new order! Visit us today at [Store_Link].',
    ],
  };

  return (
    <div className="flex h-screen antialiased text-gray-800">
      <div className="flex flex-row h-full w-full overflow-x-hidden">
        <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
          <div className="flex flex-col mt-8">
            <div className="flex flex-row items-center justify-between text-l">
              <span className="font-bold">Available Templates</span>
            </div>

            {/* Template Title */}
            <div className="flex flex-col space-y-1 mt-4 -mx-2 h-full overflow-y-auto">
              {data.title.map((item, i) => (
                <button
                  className={
                    i + 1 === active
                      ? 'flex flex-row items-center bg-gray-300 hover:bg-gray-200 rounded-xl p-2'
                      : 'flex flex-row items-center bg-gray-100 hover:bg-gray-200 rounded-xl p-2'
                  }
                  onClick={() => setActive(i + 1)}
                  key={i}
                >
                  <div className="ml-2 text-sm font-semibold">{item}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Template Body */}
        <div className="flex flex-col flex-auto h-[78%] p-6">
          <div className="flex flex-col flex-auto items-center justify-between flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
            <div className="p-3 rounded-lg">
              <div className="relative ml-3 text-l bg-white py-2 px-4 shadow rounded-xl">
                {data.body.map((item, i) => {
                  if (i + 1 === active) {
                    return <div key={i}>{item}</div>;
                  } else {
                    return <div key={i}></div>;
                  }
                })}
              </div>
            </div>
            <button className="w-40 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center justify-center gap-1">
              <svg
                className="fill-current w-4 h-4 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
              </svg>
              <span>Import</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemplatesFlow;
