import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import Head from "next/head";
import { type JokeParameters } from "~/utils/interfaces";
import { useState } from "react";
import { api } from "~/utils/api";

const JokeGenerator = (props: JokeParameters) => {
  const [jokeResponse, setJokeResponse] = useState("Knock knock... ");
  const [isLoading, setIsLoading] = useState(false); // Add loading state

  const { mutate } = api.jokes.getJoke.useMutation({
    onSuccess: (data) => {
      setIsLoading(false); // Turn off loading state
      setJokeResponse(data);
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content;
      if (errorMessage && errorMessage[0]) {
        alert(
          "Failed to get joke! Please try again later. \n" + errorMessage[0]
        );
      } else {
        alert("Failed to get joke! Please try again later.");
      }
      setIsLoading(false); // Turn off loading state
    },
  });

  const handleButtonClick = () => {
    setIsLoading(true); // Turn on loading state
    mutate(props);
  };

  return (
    <div>
      <button type="submit" className="btn" onClick={handleButtonClick}>
        Generate Knock Knock Joke
      </button>

      <div className="mt-4 rounded-lg bg-white p-4 shadow-lg">
        <h2 className="text-lg font-bold">Generated Joke:</h2>
        {isLoading && <p>Loading... This may take up to 30 seconds.</p>}{" "}
        {/* Render loading message */}
        {!isLoading && <p>{jokeResponse ?? "Knock knock..."}</p>}
      </div>
    </div>
  );
};

const Home: NextPage = () => {
  const user = useUser();
  const [jokeParams, setJokeParams] = useState<JokeParameters>({
    age: "13-18",
    gender: "Male",
    topic: "",
    length: "Medium",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setJokeParams((prevParams) => ({
      ...prevParams,
      [name]: value,
    }));
  };

  return (
    <>
      <Head>
        <title>Knock Knock</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div>
          {!user?.isSignedIn && (
            <div className="mb-4 text-center text-white">
              <h1 className="mb-2 text-4xl font-bold">
                Welcome to Knock Knock Jokes!
              </h1>
              <p className="text-lg">Please log in to generate jokes.</p>
            </div>
          )}
          {user?.isSignedIn && (
            <div className="mb-4 text-center text-white">
              <h1 className="mb-2 text-4xl font-bold">Knock Knock Jokes</h1>
              <p className="text-lg">
                Some jokes may be generated multiple times. Enjoy!
              </p>
            </div>
          )}

          {!user?.isSignedIn && (
            <div className="flex justify-center">
              <SignInButton mode="modal">
                <button className="btn">Sign in</button>
              </SignInButton>
            </div>
          )}
          {user?.isSignedIn && (
            <div className="flex justify-center">
              <SignOutButton>
                <button className="btn-out">Sign out</button>
              </SignOutButton>
            </div>
          )}
          {user?.isSignedIn && (
            <div>
              {" "}
              <form className="mt-4 rounded-lg bg-white p-4 shadow-lg">
                <div className="mb-4">
                  <label htmlFor="age" className="text-lg">
                    Age:
                  </label>
                  <br />
                  <input
                    type="radio"
                    onChange={handleInputChange}
                    id="age1-12"
                    name="age"
                    value="1-12"
                    className="mr-1"
                  />
                  <label htmlFor="age7-12">1-12</label>
                  <br />
                  <input
                    type="radio"
                    onChange={handleInputChange}
                    id="age13-18"
                    name="age"
                    value="13-18"
                    className="mr-1"
                  />
                  <label htmlFor="age13-18">13-18</label>
                  <br />
                  <input
                    type="radio"
                    onChange={handleInputChange}
                    id="age18-29"
                    name="age"
                    value="18-29"
                    className="mr-1"
                    defaultChecked
                  />
                  <label htmlFor="age18-29">18-29</label>
                  <br />
                  <input
                    type="radio"
                    onChange={handleInputChange}
                    id="age30-59"
                    name="age"
                    value="30-59"
                    className="mr-1"
                  />
                  <label htmlFor="age30-59">30-59</label>
                  <br />
                  <input
                    type="radio"
                    onChange={handleInputChange}
                    id="age60+"
                    name="age"
                    value="60+"
                    className="mr-1"
                  />
                  <label htmlFor="age60+">60+</label>
                </div>

                <div className="mb-4">
                  <label htmlFor="gender" className="text-lg">
                    Gender:
                  </label>
                  <br />
                  <input
                    type="radio"
                    onChange={handleInputChange}
                    id="male"
                    name="gender"
                    value="Male"
                    defaultChecked
                    className="mr-1"
                  />
                  <label htmlFor="male">Male</label>
                  <br />
                  <input
                    type="radio"
                    onChange={handleInputChange}
                    id="female"
                    name="gender"
                    value="Female"
                    className="mr-1"
                  />
                  <label htmlFor="female">Female</label>
                </div>

                <div className="mb-4">
                  <label htmlFor="length" className="text-lg">
                    Joke Length:
                  </label>
                  <br />
                  <input
                    type="radio"
                    onChange={handleInputChange}
                    id="short"
                    name="length"
                    value="15"
                    className="mr-1"
                  />
                  <label htmlFor="short">Short</label>
                  <br />
                  <input
                    type="radio"
                    onChange={handleInputChange}
                    id="medium"
                    name="length"
                    value="30"
                    className="mr-1"
                    defaultChecked
                  />
                  <label htmlFor="medium">Medium</label>
                  <br />
                  <input
                    type="radio"
                    onChange={handleInputChange}
                    id="long"
                    name="length"
                    value="60-120"
                    className="mr-1"
                  />
                  <label htmlFor="long">Long</label>
                  <br />
                  <input
                    type="radio"
                    onChange={handleInputChange}
                    id="story"
                    name="length"
                    value="200"
                    className="mr-1"
                  />
                  <label htmlFor="story">Story</label>
                </div>

                <div className="mb-4">
                  <label htmlFor="topic" className="text-lg">
                    Topic Entry:
                  </label>
                  <br />
                  <input
                    type="text"
                    onChange={handleInputChange}
                    id="topic"
                    name="topic"
                    placeholder="Enter a topic"
                    className="rounded border p-2"
                  />
                </div>
              </form>
              <br />
              <JokeGenerator {...jokeParams} />{" "}
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Home;
