import { FormEvent } from "react";
import {
  Button,
  FormFieldset,
  FormInput,
  FormLegend,
} from "../../ui/components";
import { User } from "../types/userSchema";

type UsersFormProps = {
  buttonLabel: string;
  user?: User;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
};

export default function UsersForm({
  handleSubmit,
  user,
  buttonLabel,
}: UsersFormProps) {
  return (
    <form
      onSubmit={handleSubmit}
      className="border p-10 space-y-3 space-x-3 mx-auto shadow-md bg-white rounded-2xl"
    >
      <FormFieldset>
        <FormLegend>User info</FormLegend>
        <FormInput
          label="Name"
          id="name"
          name="name"
          type="text"
          placeholder="Ben Schneider"
          defaultValue={user?.name || ""}
          required
        />
        <FormInput
          label="Username"
          id="username"
          name="username"
          type="text"
          placeholder="BenSc77"
          defaultValue={user?.username || ""}
          required
        />
        <FormInput
          label="Email"
          id="email"
          name="email"
          type="email"
          placeholder="bens@email.com"
          defaultValue={user?.email || ""}
          required
        />
        <FormInput
          label="Phone"
          type="text"
          id="phone"
          name="phone"
          placeholder="(345)456-5788"
          defaultValue={user?.phone || ""}
          required
        />
        <FormInput
          label="Website"
          type="text"
          id="website"
          name="website"
          placeholder="misite.com"
          defaultValue={user?.website || ""}
          required
        />
      </FormFieldset>
      <FormFieldset>
        <FormLegend>Address</FormLegend>
        <FormInput
          label="Street"
          id="street"
          name="street"
          type="text"
          placeholder="Yellow st. 16"
          defaultValue={user?.address.street || ""}
          required
        />
        <FormInput
          label="Suite"
          id="suite"
          name="suite"
          type="text"
          placeholder="Suite 68"
          defaultValue={user?.address.suite || ""}
          required
        />
        <FormInput
          label="City"
          id="city"
          name="city"
          type="text"
          placeholder="Mexico City"
          defaultValue={user?.address.city || ""}
          required
        />
        <FormInput
          label="Zipcode"
          id="zipcode"
          name="zipcode"
          type="text"
          placeholder="34572"
          defaultValue={user?.address.zipcode || ""}
          required
        />
        <FormFieldset>
          <FormLegend>Geo</FormLegend>
          <FormInput
            label="Latitude"
            id="lat"
            name="lat"
            type="text"
            placeholder="-1.8129"
            defaultValue={user?.address.geo.lat || ""}
            required
          />
          <FormInput
            label="Longitude"
            id="lng"
            name="lng"
            type="text"
            placeholder="2.5342"
            defaultValue={user?.address.geo.lng || ""}
            required
          />
        </FormFieldset>
      </FormFieldset>
      <FormFieldset>
        <FormLegend>Company</FormLegend>
        <FormInput
          label="Name"
          id="company_name"
          name="company_name"
          type="text"
          placeholder="Tesla"
          defaultValue={user?.company.name || ""}
          required
        />
        <FormInput
          label="BS"
          id="bs"
          name="bs"
          type="text"
          placeholder="Innovating the future of finance"
          defaultValue={user?.company.bs || ""}
          required
        />
        <FormInput
          label="Phrase"
          id="catchPhrase"
          name="phrase"
          type="text"
          placeholder="Think different"
          defaultValue={user?.company.catchPhrase || ""}
          required
        />
      </FormFieldset>
      <div className="flex justify-center mt-10">
        <Button
          type="submit"
          className="bg-green-400 text-white"
        >
          {buttonLabel}
        </Button>
      </div>
    </form>
  );
}
