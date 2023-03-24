import React, { useEffect } from "react"

interface IProps {
    enabled: boolean | undefined,
    onIntersect: Function,
    root: React.MutableRefObject<null> | undefined,
    rootMargin: string,
    target: React.MutableRefObject<null>,
    threshold: number,
}

export default function useIntersectionObserver({
    enabled = true,
    onIntersect,
    root,
    rootMargin,
    target,
    threshold
}: IProps) {
    useEffect(() => {
        if (!enabled) {
            return
        }

        const observer = new IntersectionObserver(
            (entries) => entries.forEach((entry) => entry.isIntersecting && onIntersect()),
            {
                root: root && root.current,
                rootMargin,
                threshold,
            },
        )

        const el = target && target.current

        if (!el) {
            return
        }

        observer.observe(el)

        return () => {
            observer.unobserve(el)
        }
    }, [target.current, enabled])
}