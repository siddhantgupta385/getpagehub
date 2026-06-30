import { site } from "@/lib/site";
import { Stars } from "./Stars";

type PlaceReview = {
  rating: number;
  text?: { text?: string };
  originalText?: { text?: string };
  relativePublishTimeDescription?: string;
  authorAttribution?: {
    displayName?: string;
    photoUri?: string;
    uri?: string;
  };
};

type PlaceDetails = {
  rating?: number;
  userRatingCount?: number;
  reviews?: PlaceReview[];
};

async function getPlaceDetails(): Promise<PlaceDetails | null> {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  if (!key) return null;

  try {
    const res = await fetch(
      `https://places.googleapis.com/v1/places/${site.google.placeId}`,
      {
        headers: {
          "X-Goog-Api-Key": key,
          "X-Goog-FieldMask": "rating,userRatingCount,reviews",
        },
        next: { revalidate: 86400 },
      },
    );
    if (!res.ok) return null;
    return (await res.json()) as PlaceDetails;
  } catch {
    return null;
  }
}

export async function Reviews() {
  const details = await getPlaceDetails();
  const reviews = details?.reviews ?? [];

  return (
    <section className="relative overflow-hidden bg-surface py-20" id="reviews">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_50%_0%,rgba(37,99,235,0.14),transparent_70%)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-brand-light">
            <GoogleIcon className="h-4 w-4" />
            Customer Reviews
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-white">
            What Our{" "}
            <span className="bg-gradient-to-r from-brand-light to-blue-300 bg-clip-text text-transparent">
              Customers
            </span>{" "}
            Say
          </h2>

          {details?.rating ? (
            <div className="mt-6 inline-flex items-center gap-4 rounded-2xl bg-card px-6 py-4 ring-1 ring-white/10 shadow-lg shadow-black/20">
              <span className="text-4xl font-extrabold leading-none text-white">
                {details.rating.toFixed(1)}
              </span>
              <span className="h-10 w-px bg-white/10" />
              <span className="text-left">
                <Stars rating={details.rating} />
                {details.userRatingCount ? (
                  <span className="mt-1 block text-sm text-slate-400">
                    Based on {details.userRatingCount} Google reviews
                  </span>
                ) : null}
              </span>
            </div>
          ) : null}
        </div>

        {reviews.length > 0 ? (
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {reviews.slice(0, 6).map((r, i) => (
              <article
                key={i}
                className="group relative flex flex-col overflow-hidden rounded-2xl bg-card p-6 ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-1 hover:ring-brand/50 hover:shadow-xl hover:shadow-brand/10"
              >
                <span className="absolute -top-3 left-5 h-1.5 w-16 rounded-full bg-gradient-to-r from-brand to-brand-light opacity-0 transition-opacity group-hover:opacity-100" />
                <QuoteIcon className="absolute right-4 top-4 h-12 w-12 text-brand/10" />
                <Stars rating={r.rating} />
                <p className="relative mt-4 flex-1 text-slate-200 leading-relaxed line-clamp-6">
                  {r.text?.text ?? r.originalText?.text}
                </p>
                <div className="mt-5 flex items-center gap-3 border-t border-white/10 pt-4">
                  {r.authorAttribution?.photoUri ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={r.authorAttribution.photoUri}
                      alt={r.authorAttribution.displayName ?? "Reviewer"}
                      referrerPolicy="no-referrer"
                      className="h-10 w-10 rounded-full object-cover ring-1 ring-white/10"
                    />
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand/20 font-semibold text-brand-light">
                      {r.authorAttribution?.displayName?.charAt(0) ?? "G"}
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-white">
                      {r.authorAttribution?.displayName ?? "Google User"}
                    </p>
                    <p className="text-xs text-slate-400">
                      {r.relativePublishTimeDescription}
                    </p>
                  </div>
                  <GoogleIcon className="ml-auto h-5 w-5 shrink-0 opacity-70" />
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="relative mt-12 mx-auto max-w-2xl overflow-hidden rounded-2xl bg-card p-8 text-center ring-1 ring-white/10">
            <QuoteIcon className="absolute -right-2 -top-2 h-20 w-20 text-brand/10" />
            <div className="flex justify-center">
              <Stars rating={5} />
            </div>
            <p className="mt-4 text-xl font-bold text-white">
              Trusted across Murfreesboro &amp; Rutherford County
            </p>
            <p className="mt-2 text-slate-300">
              Read what our customers are saying on our Google Business Profile —
              and share your own experience after we get you back on the road.
            </p>
          </div>
        )}

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={site.google.profile}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-base font-semibold text-white hover:bg-brand-light transition-colors"
          >
            <GoogleIcon className="h-5 w-5" />
            Check Us Out On Google
          </a>
          <a
            href={site.google.writeReview}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border-2 border-brand-light px-6 py-3 text-base font-semibold text-brand-light hover:bg-brand/10 transition-colors"
          >
            Leave Us a Review
          </a>
        </div>
      </div>
    </section>
  );
}

function QuoteIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M7.5 6C5 6 3 8 3 10.5S5 15 7.5 15c.2 0 .4 0 .6-.04C7.4 16.2 6.2 17.2 4.6 17.7a.75.75 0 0 0 .45 1.43C8.4 18.1 11 15 11 11V10.5C11 8 9 6 7.5 6Zm9 0C14 6 12 8 12 10.5S14 15 16.5 15c.2 0 .4 0 .6-.04-.7 1.24-1.9 2.24-3.5 2.74a.75.75 0 0 0 .45 1.43C17.4 18.1 20 15 20 11V10.5C20 8 18 6 16.5 6Z" />
    </svg>
  );
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#fff" d="M21.35 11.1h-9.18v2.96h5.27c-.23 1.4-1.6 4.1-5.27 4.1a5.92 5.92 0 0 1 0-11.84c1.86 0 3.1.79 3.81 1.47l2.6-2.5C17.04 3.66 14.86 2.7 12.17 2.7a9.3 9.3 0 1 0 0 18.6c5.37 0 8.92-3.78 8.92-9.1 0-.61-.07-1.08-.16-1.55l.42.45Z" />
    </svg>
  );
}
