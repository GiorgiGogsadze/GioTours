import s from "../styles/About.module.css";
export default function Info() {
  return (
    <section id="info" style={{ marginTop: "-8rem" }} className={s.about}>
      <h2 className="heading-secondary">About GioTours</h2>
      <h3 className={s.h3}>Who We Are</h3>
      <p>
        we believe that travel is not just about visiting new places; it&apos;s
        about creating unforgettable memories and connecting with the world.
        Established in 2010, our agency has been curating extraordinary travel
        experiences for adventurers, families, and solo travelers alike.
      </p>
      <h3 className={s.h3}>Our Services</h3>
      <ul>
        <li>
          <b>Tailored Itineraries</b>: We specialize in crafting personalized
          itineraries that cater to your unique interests and preferences.
          Whether you dream of exploring ancient ruins, relaxing on pristine
          beaches, or embarking on thrilling safaris, we&apos;ve got you
          covered.
        </li>
        <li>
          <b>Expert Guidance</b>: Our team of travel experts knows the ins and
          outs of every destination. From hidden gems to iconic landmarks,
          we&apos;ll guide you through the best experiences each place has to
          offer.
        </li>
        <li>
          <b>Sustainable Travel</b>: We are committed to responsible tourism.
          Our partnerships with local communities ensure that your travels leave
          a positive impact on the environment and support local livelihoods.
        </li>
      </ul>
      <h3 className={s.h3}>What Sets Us Apart</h3>
      <ul>
        <li>
          <b>Passion for Exploration</b>: We&apos;re not just travel agents;
          we&apos;re fellow wanderers. Our passion for discovering new cultures
          and landscapes drives everything we do.
        </li>
        <li>
          <b>Personal Touch</b>: When you book with us, you become part of our
          travel family. Expect personalized attention, 24/7 support, and a
          friendly face to greet you at every destination.
        </li>
        <li>
          <b>Unforgettable Moments</b>: From sipping coffee in a Parisian café
          to witnessing the Northern Lights in Iceland, we create moments that
          stay with you forever.
        </li>
      </ul>
      <h3 className={s.h3}>contact information</h3>
      <p>Ready to embark on your next adventure? Reach out to us:</p>
      <ul>
        <li className={s.lwi}>
          <svg className={s.icon}>
            <use xlinkHref="/img/icons.svg#icon-phone"></use>
          </svg>{" "}
          Call us at +1 (555) 123-4567
        </li>
        <li className={s.lwi}>
          <svg className={s.icon}>
            <use xlinkHref="/img/icons.svg#icon-mail"></use>
          </svg>{" "}
          Email us at info@tours.com
        </li>
        <li className={s.lwi}>
          <svg className={s.icon}>
            <use xlinkHref="/img/icons.svg#icon-map"></use>
          </svg>{" "}
          Visit our office at 123 Main Street Cityville
        </li>
      </ul>
      <p>
        Follow us on{" "}
        <a href="https://www.instagram.com" target="_blank" className={s.link}>
          Instagram
        </a>{" "}
        and{" "}
        <a href="https://www.facebook.com" target="_blank" className={s.link}>
          Facebook
        </a>{" "}
        for travel inspiration and updates.
      </p>
      <p>
        Let&apos;s explore the world together! --- Feel free to customize this
        text to match your agency&apos;s unique voice and style. Safe travels!
      </p>
    </section>
  );
}
