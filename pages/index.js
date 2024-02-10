import Head from "next/head";
import { MongoClient } from "mongodb";

import MeetupList from "../components/meetups/MeetupList";
import { Fragment } from "react";

function HomePage(props) {
  return (
    <Fragment>
    <Head>
      <title>React Meetups</title>
      <meta name="description" content="a list of meetups"/>
    </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}

export async function getStaticProps() {
  const client = new MongoClient(
    "mongodb+srv://nived123:nived123@meetups.uoqfzyb.mongodb.net/?retryWrites=true&w=majority"
  );
  await client.connect();
  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 10,
  };
}

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;
//   return{
//     props: {
//       meetups: DUMMY_MEETUPS
//     }
//   }
// }
export default HomePage;
