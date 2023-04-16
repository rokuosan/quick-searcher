import { Noto_Sans_JP } from "@next/font/google"
import { ReactNode } from "react"
import QiitaArticle from "../types/QiitaArticle"

type Props = {
  article: QiitaArticle,
  children: ReactNode
}

const font = Noto_Sans_JP({ weight: '400', subsets: ['latin'] })

const QiitaArticleCard = (props: Props) => {
  const a = props.article

  return (
    <>
      <a href={a.url} target="_blank" rel="noreferrer">
        <div className={"leading-relaxed max-w-lg p-4 rounded-lg bg-white border-2 border-white hover:border-lime-400 "+font.className}>
          <div className="pb-2">@{a.user.id}</div>
          <h4 className="text-2xl" >{a.title}</h4>
          <div className="pt-2">
            <i className="fa-regular fa-heart"></i>
            <span className="pl-2">
              {a.likes_count}
            </span>
          </div>
          {props.children}
        </div>
      </a>
    </>
  )

}

export default QiitaArticleCard
