import { Headers } from '../Headers/Headers';
import { Location } from '../Location/Location';
import { Footer } from '../Footer/Footer';

export const Accessories = () => (
  <div className="accessoires">
    <div>
      <Headers />
      <Location />
      <div className="accessoires__text">
        Unfortenatly we don`t have any propose to you in this category
      </div>
    </div>
    <Footer />
  </div>
);
