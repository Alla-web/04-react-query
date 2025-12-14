import styles from "./SearchBar.module.css";
import toast from "react-hot-toast";
import clsx from "clsx";

interface SearchBarProps {
  onSubmit: (query: string) => void;
  disabled?: boolean;
}

export default function SearchBar({ onSubmit, disabled }: SearchBarProps) {
  const handleSearch = (formData: FormData) => {
    const query = formData.get("query") as string;

    if (disabled) return;

    if (query.trim() !== "") {
      onSubmit(query);
    } else {
      notify();
    }
  };

  const notify = () => toast("Please enter your search query");

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a
          className={styles.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>
        <form className={styles.form} action={handleSearch}>
          <input
            className={styles.input}
            type="text"
            name="query"
            autoComplete="off"
            placeholder="Search movies..."
            autoFocus
          />
          <button
            className={clsx(styles.button, disabled && styles.buttonDisabled)}
            type="submit"
          >
            Search
          </button>
        </form>
      </div>
    </header>
  );
}
