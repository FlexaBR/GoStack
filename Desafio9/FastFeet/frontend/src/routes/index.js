import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import Deliveries from '../pages/Deliveries';
import DeliveryForm from '../pages/Deliveries/DeliveryForm';
import Deliverymans from '../pages/Deliverymans';
import Recipients from '../pages/Recipients';
import Problems from '../pages/Problems';

import { items } from '~/components/Header/navigation';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route
        path={items.deliveries.route}
        component={Deliveries}
        navItem={items.deliveries.name}
        isPrivate
        exact
      />
      <Route
        path={`${items.deliveries.route}/new`}
        component={DeliveryForm}
        navItem={items.deliveries.name}
        isPrivate
      />

      <Route
        path={items.deliverymans.route}
        component={Deliverymans}
        navItem={items.deliverymans.name}
        isPrivate
        exact
      />

      <Route
        path={items.recipients.route}
        component={Recipients}
        navItem={items.recipients.name}
        isPrivate
        exact
      />

      <Route
        path={items.problems.route}
        component={Problems}
        navItem={items.problems.name}
        isPrivate
        exact
      />
    </Switch>
  );
}
