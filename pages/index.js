import Head from "next/head";
import { MongoClient } from "mongodb";
import { Fragment } from "react";

import MeetupList from "../components/meetups/MeetupList";

const DUMMY_MEETUPS = [
  {
    id: "m1",
    title: "some place",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Bergtocht_van_Peio_Paese_naar_Lago_Covel_%281%2C839_m%29_in_het_Nationaal_park_Stelvio_%28Itali%C3%AB%29._Lago_Covel_%281%2C839_m%29.jpg/1920px-Bergtocht_van_Peio_Paese_naar_Lago_Covel_%281%2C839_m%29_in_het_Nationaal_park_Stelvio_%28Itali%C3%AB%29._Lago_Covel_%281%2C839_m%29.jpg",
    address: "some address 1, peeche wali gali",
    description: "This is a first meetup",
  },
  {
    id: "m2",
    title: "some other place",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Bergtocht_van_Peio_Paese_naar_Lago_Covel_%281%2C839_m%29_in_het_Nationaal_park_Stelvio_%28Itali%C3%AB%29._Lago_Covel_%281%2C839_m%29.jpg/1920px-Bergtocht_van_Peio_Paese_naar_Lago_Covel_%281%2C839_m%29_in_het_Nationaal_park_Stelvio_%28Itali%C3%AB%29._Lago_Covel_%281%2C839_m%29.jpg",
    address: "some address 2, sup dup",
    description: "This is second meetup",
  },
];

const HomePage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>Meetups</title>
        <meta name="description" content="Bhai boht karri meetups React use krke" />
      </Head>
      <MeetupList meetups={props.meetups} />;
    </Fragment>
  );
};

export async function getStaticProps() {
  // fetch data from API
  const client = await MongoClient.connect(
    "mongodb+srv://zakiahmed8871:zaki@cluster0.12sc0.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => {
        return {
          title: meetup.title,
          address: meetup.address,
          image: meetup.image,
          id: meetup._id.toString(),
        };
      }),
    },
    revalidate: 1,
  };
}

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

export default HomePage;
