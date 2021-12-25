import Head from 'next/Head'
import DecisionTree from 'decision-tree'
import { useState } from 'react'
// 訓練的數據
const trainingData = [
  { meals: '早餐', main: '麵包', drink: '牛奶', liked: true },
  { meals: '早餐', main: '杯麵', drink: '可樂', liked: false },
  { meals: '早餐', main: '雞蛋', drink: '牛奶', liked: false },
  { meals: '午餐', main: '烏冬', drink: '可樂', liked: true },
  { meals: '午餐', main: '牛扒', drink: '紅酒', liked: false },
  { meals: '午餐', main: '豬扒', drink: '羅宋湯', liked: false },
  { meals: '晚餐', main: '牛扒', drink: '紅酒', liked: false },
  { meals: '晚餐', main: '豬扒', drink: '羅宋湯', liked: true },
  { meals: '晚餐', main: '杯麵', drink: '可樂', liked: false }
]

const testData = [
  { meals: '早餐', main: '麵包', drink: '牛奶', liked: true }
]

export default function Home () {
  // const [trainingData, setTrainingData] = useState([
  // { meals: '早餐', drink: '麵包', drink: '牛奶', liked: true },
  // { meals: '早餐', drink: '杯麵', drink: '可樂', liked: false },
  // { meals: '早餐', drink: '雞蛋', drink: '牛奶', liked: false },
  // { meals: '午餐', drink: '烏冬', drink: '可樂', liked: true },
  // { meals: '午餐', drink: '牛扒', drink: '紅酒', liked: false },
  // { meals: '午餐', drink: '豬扒', drink: '羅宋湯', liked: false },
  // { meals: '晚餐', drink: '牛扒', drink: '紅酒', liked: true },
  // { meals: '晚餐', drink: '豬扒', drink: '羅宋湯', liked: true },
  // { meals: '晚餐', drink: '杯麵', drink: '可樂', liked: false }
  // ])

  // const [testData, setTestData] = useState([
  //   { meals: '早餐', drink: '麵包', drink: '牛奶', liked: true }
  // ])

  const [vail, setVail] = useState({
    meals: '晚餐',
    main: '豬扒',
    drink: '羅宋湯'
  })

  const [temVail, setTemVail] = useState(['晚餐', '豬扒', '羅宋湯'])
  // 判定結果的列
  const className = 'liked'

  // 用來預測的數據標籤
  const features = ['meals', 'main', 'drink']

  // 創建模型：
  const dt = new DecisionTree(trainingData, className, features)
  // 用來預測的數據標籤
  // console.log(dt)
  const predictedClass = dt.predict(vail)
  // 導入測試數據，返回樣本的準確性
  const accuracy = dt.evaluate(testData)
  // const treeJson = dt.toJSON() // 底層模型，可用來可視化或者再次使用
  // const preTrainedDecisionTree = new DecisionTree(treeJson) 這樣可以直接使用這個訓練好的模型
  // dt.import(treeJson) 這樣可以直接在現有樹中導入這個訓練好的模型
  console.log(predictedClass)
  console.log(accuracy)
  // console.log(dt)
  // console.log(treeJson)
  return (
    <div>
      <h1 className='text-3xl font-bold pb-10'>
        決策樹
      </h1>
      <div className='flex'>
        <div>
          <div className='w-96 text-center'>
            <h1 className='text-xl font-bold'>
              這是訓練的數據
            </h1>
            <div className='flex'>
              <span className='w-1/4'>時段</span>
              <span className='w-1/4'>主食</span>
              <span className='w-1/4'>飲料</span>
              <span className='w-1/4'>是否喜歡</span>
            </div>
            <div className='h-px bg-black my-2' />
            {
              trainingData.map((item, index) => {
                return (
                  <div key={index} className='flex'>
                    <span className='w-1/4'>{item.meals}</span>
                    <span className='w-1/4'>{item.main}</span>
                    <span className='w-1/4'>{item.drink}</span>
                    <span className='w-1/4'>{item.liked ? '喜歡' : '不喜歡'}</span>
                  </div>
                )
              })
            }
          </div>
          <div className='w-96 text-center mt-10'>
            <h1 className='text-xl font-bold'>
              這次測試數據，返回樣本的準確性
            </h1>
            <div className='flex'>
              <span className='w-1/4'>時段</span>
              <span className='w-1/4'>主食</span>
              <span className='w-1/4'>飲料</span>
              <span className='w-1/4'>是否喜歡</span>
            </div>
            <div className='h-px bg-black my-2' />
            {
              testData.map((item, index) => {
                return (
                  <div key={index} className='flex'>
                    <span className='w-1/4'>{item.meals}</span>
                    <span className='w-1/4'>{item.main}</span>
                    <span className='w-1/4'>{item.drink}</span>
                    <span className='w-1/4'>{item.liked ? '喜歡' : '不喜歡'}</span>
                  </div>
                )
              })
            }
          </div>
        </div>
        <div className=' ml-10'>
          <h3 className='text-xl font-bold pb-10'>
            樣本準確性:   {accuracy * 100}%
          </h3>
          <div>
            <h3 className='text-xl font-bold pb-5'>
              驗證：
            </h3>
            <div className='w-96 text-center'>
              <div className='flex'>
                <span className='w-1/4'>時段</span>
                <span className='w-1/4'>主食</span>
                <span className='w-1/4'>飲料</span>
                <span className='w-1/4' />
              </div>
              <div className='flex'>
                <input className='w-1/4 px-1 border-black border-2 mx-1' value={temVail[0]} onChange={e => setTemVail([e.target.value, vail[1], vail[2]])} />
                <input className='w-1/4 px-1 border-black border-2 mx-1' value={temVail[1]} onChange={e => setTemVail([vail[0], e.target.value, vail[2]])} />
                <input className='w-1/4 px-1 border-black border-2 mx-1' value={temVail[2]} onChange={e => setTemVail([vail[0], vail[1], e.target.value])} />
                <button
                  className='w-1/4 bg-blue-700 hover:bg-blue-600 text-white border-gray-400'
                  onClick={() => {
                    setVail({
                      meals: temVail[0],
                      main: temVail[1],
                      drink: temVail[2]
                    })
                  }}
                >
                    驗證
                </button>
              </div>
              <h3 className='text-xl font-bold pb-5'>
                驗證結果：{predictedClass ? '喜歡' : '不喜歡'}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
