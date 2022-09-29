import React, { useEffect, useState } from "react";
import { Breadcrumb } from "react-bootstrap";
import { webSocket } from "rxjs/webSocket";

import TripCard from "./TripCard";
import { getTrips } from "../services/TripService";
import { getAccessToken } from "../services/AuthService";

function DriverDashboard(props) {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const loadTrips = async () => {
      const { response, isError } = await getTrips();
      if (isError) {
        setTrips([]);
      } else {
        setTrips(response.data);
      }
    };
    loadTrips();
  }, []);

  useEffect(() => {
    const token = getAccessToken();
    const ws = webSocket(`ws://localhost:8003/rides/?token=${token}`);
    const subscription = ws.subscribe((message) => {
      setTrips(prevTrips => [
        ...prevTrips.filter(trip => trip.id !== message.data.id),
        message.data
      ]);
    });
    return () => {
      subscription.unsubscribe();
    }
  }, []);

  const getCurrentTrips = () => {
    return trips.filter((trip) => {
      return trip.driver !== null && trip.status !== "COMPLETED";
    });
  };

  const getRequestedTrips = () => {
    return trips.filter((trip) => {
      return trip.status === "REQUESTED";
    });
  };

  const getCompletedTrips = () => {
    return trips.filter((trip) => {
      return trip.status === "COMPLETED";
    });
  };

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item active>Dashboard</Breadcrumb.Item>
      </Breadcrumb>
      <TripCard title="Current Trip" trips={getCurrentTrips()} group="driver" otherGroup="rider" />
      <TripCard
        title="Requested Trips"
        trips={getRequestedTrips()}
        group="driver"
        otherGroup="rider"
      />
      <TripCard
        title="Recent Trips"
        trips={getCompletedTrips()}
        group="driver"
        otherGroup="rider"
      />
    </>
  );
}

export default DriverDashboard;
