import { useAdminAddTour } from "./useAdminAddTour";
import { useAdminEditTour } from "./useAdminEditTour";
import SpinnerMini from "../components/SpinnerMini";
import s from "./Admin.module.css";
import { useForm } from "react-hook-form";
import { useAlertConfirm } from "../Alert/AlertConfirmContext";
import { useEffect } from "react";
import { isDateActive } from "../helper/isDateActive";

export default function AdminTourForm({
  tour,
  setFormOpen,
  returnTo,
  elementRef,
}) {
  const { addTour, isAddingTour } = useAdminAddTour();
  const { editTour, isEditingTour } = useAdminEditTour();

  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
    reset,
  } = useForm();
  const { alertConfirm } = useAlertConfirm();

  useEffect(() => {
    if (!tour) {
      document.documentElement.scrollTo({
        left: 0,
        top: document.querySelector(`.${s.adminPage}`).scrollHeight,
        behavior: "smooth",
      });
      return;
    }

    setValue("title", tour.title);
    setValue("description", tour.description);
    setValue("price", tour.price);
    setValue("duration", tour.duration);
    setValue(
      "start_date",
      tour.start_date.replace("T", " ").replace("+00:00", "")
    );
    setValue("sp_place", tour.start_place.place);
    setValue("sp_region_city", tour.start_place.region_city);
    setValue("sp_country", tour.start_place.country);
    setValue("sp_continent", tour.start_place.continent);
    setValue("sl_lat", tour.start_location.lat);
    setValue("sl_lng", tour.start_location.lng);
    setValue(
      "visit_places",
      tour.visit_places
        .reduce(
          (acc, el) =>
            acc + `\n${el.place} ~~ ${el.region_city} ~~ ${el.country}`,
          ""
        )
        .trim()
    );
  }, [setValue, tour]);

  function onSubmit({
    image,
    title,
    description,
    price,
    duration,
    start_date,
    sp_place,
    sp_region_city,
    sp_country,
    sp_continent,
    sl_lat,
    sl_lng,
    visit_places,
  }) {
    const newTour = {
      title,
      description,
      price: +price,
      duration: +duration,
      start_date: start_date.trim().replace(" ", "T") + "+00:00",
      start_place: {
        place: sp_place,
        region_city: sp_region_city,
        country: sp_country,
        continent: sp_continent,
      },
      start_location: { lat: +sl_lat, lng: +sl_lng },
      visit_places: visit_places
        .trim()
        .split("\n")
        .reduce((acc, el) => {
          const [place, region_city, country] = el
            .split(" ~~ ")
            .map((s) => s.trim());
          return [...acc, { place, region_city, country }];
        }, []),
    };
    const imageFile = image.length > 0 ? image[0] : undefined;

    const successFn = () => {
      reset();
      setFormOpen(0);
      if (returnTo || returnTo === 0)
        elementRef.current.scrollTo({ top: returnTo });
    };
    if (!tour) {
      addTour(
        { tour: newTour, image: imageFile },
        {
          onSuccess: successFn,
        }
      );
    } else {
      if (isDateActive(tour.start_date)) {
        editTour(
          { oldTour: tour, updatedTour: newTour, newImg: imageFile },
          {
            onSuccess: successFn,
          }
        );
      } else {
        alertConfirm(
          () =>
            editTour(
              {
                oldTour: tour,
                updatedTour: newTour,
                newImg: imageFile,
                renew: true,
              },
              {
                onSuccess: successFn,
              }
            ),
          "As The Tour was in past, new Tour with given information will be created",
          "confirm"
        );
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`${s.adminTourForm}`}>
      <label style={{ width: "25rem" }}>
        <p>Image</p>
        <input
          className={s.adminImageInput}
          type="file"
          accept="image/*"
          {...register("image", {
            required: { value: !tour, message: "image is required" },
          })}
          style={{
            backgroundColor: "transparent",
            color: "inherit",
            border: "none",
            cursor: "pointer",
          }}
        />
        <p className={s.errMsg}>{errors?.image?.message}</p>
      </label>
      <label style={{ width: "30rem" }}>
        <p>Title</p>
        <input required maxLength={35} type="text" {...register("title")} />
        <p className={s.errMsg}>{errors?.title?.message}</p>
      </label>
      <label style={{ width: "100%" }}>
        <p>Description</p>
        <p className={s.errMsg}>{errors?.description?.message}</p>
        <textarea
          required
          style={{ width: "100%", height: "5rem" }}
          {...register("description")}
        />
      </label>
      <label style={{ width: "11rem" }}>
        <p>Price</p>
        <input
          required
          min={0}
          type="number"
          step="any"
          {...register("price")}
          onWheel={(e) => e.target.blur()}
        />
        <p className={s.errMsg}>{errors?.price?.message}</p>
      </label>
      <label style={{ width: "10rem" }}>
        <p>Duration (Days)</p>
        <input
          required
          min={0}
          type="number"
          {...register("duration")}
          onWheel={(e) => e.target.blur()}
        />
        <p className={s.errMsg}>{errors?.duration?.message}</p>
      </label>
      <label style={{ width: "26rem" }}>
        <p>Start Date UTC ( yyyy-mm-dd hh:mm:ss )</p>
        <input
          required
          type="text"
          {...register("start_date", {
            validate: (value) =>
              isDateActive(value) || "You can't edit tour to past",
            pattern: {
              value:
                /^\s*[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}\s*$/,
              message: "Enter valid date",
            },
          })}
        />
        <p className={s.errMsg}>{errors?.start_date?.message}</p>
      </label>
      <div className={s.break} />
      <label style={{ width: "30rem" }}>
        <p>Start Place</p>
        <textarea
          required
          style={{ width: "100%" }}
          type="text"
          {...register("sp_place")}
        />
        <p className={s.errMsg}>{errors?.sp_place?.message}</p>
      </label>
      <label style={{ width: "15rem" }}>
        <p>Start Region / City</p>
        <input required type="text" {...register("sp_region_city")} />
        <p className={s.errMsg}>{errors?.sp_region_city?.message}</p>
      </label>
      <label style={{ width: "15rem" }}>
        <p>Start Country</p>
        <input required type="text" {...register("sp_country")} />
        <p className={s.errMsg}>{errors?.sp_country?.message}</p>
      </label>
      <label style={{ width: "15rem" }}>
        <p>Start Continent</p>
        <input required type="text" {...register("sp_continent")} />
        <p className={s.errMsg}>{errors?.sp_continent?.message}</p>
      </label>
      <div className={s.break} />
      <label style={{ width: "20rem" }}>
        <p>Latitude of Start Location</p>
        <input
          required
          type="number"
          step="any"
          {...register("sl_lat")}
          onWheel={(e) => e.target.blur()}
        />
        <p className={s.errMsg}>{errors?.sl_lat?.message}</p>
      </label>
      <label style={{ width: "20rem" }}>
        <p>Longitude of Start Location</p>
        <input
          required
          type="number"
          step="any"
          {...register("sl_lng")}
          onWheel={(e) => e.target.blur()}
        />
        <p className={s.errMsg}>{errors?.sl_lng?.message}</p>
      </label>
      <label style={{ width: "100%" }}>
        <p>
          Visit Places ( in every line: place ~~ region or city ~~ country )
        </p>
        <p className={s.errMsg}>{errors?.visit_places?.message}</p>
        <textarea
          required
          style={{ width: "100%", height: "10rem" }}
          spellCheck={false}
          {...register("visit_places", {
            pattern: {
              value:
                /^(\S[^~]* ~~ \S[^~]* ~~ \S[^(~|\n)]*)(\n\S[^~]* ~~ \S[^~]* ~~ \S[^(~|\n)]*)*$/,
              message:
                "every line must have form: place ~~ region or city ~~ country",
            },
          })}
        />
      </label>
      <button
        disabled={isAddingTour || isEditingTour}
        className={s.adminTourFormBtn}
      >
        {isAddingTour || isEditingTour ? <SpinnerMini /> : "Submit"}
      </button>
    </form>
  );
}
