import styles from './ProgressBar.module.css';

interface ProgressBarProps {
    coverage?: { covered: number, total: number };
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ coverage }) => {
    const percentage = (coverage?.covered! * 100) / coverage?.total!;
    return (
        <div className={`progress ${styles.progress_container}`}>
            <div
                className={`progress-bar ${styles.progressbar}`}
                style={{ width: `${percentage}%` }}
            ></div>
        </div>
    )
}