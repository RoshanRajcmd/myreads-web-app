export default function Tooltip({ message, children }) {
    return (
        <div class="group relative flex cursor-pointer">
            {children}
            <span class="absolute top-5 scale-0 transition-all w-max rounded p-2 text-xs font-normal text-white dark:text-gray-800  bg-gray-800 dark:bg-white group-hover:scale-100">{message}</span>
        </div>
    )
}