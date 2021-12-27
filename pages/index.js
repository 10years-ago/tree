import { useState } from 'react'
const DecisionTree = require('../lib/decision-tree')
// 訓練的數據
// const trainingData = [
//   { food: '燒鴨飯', drinks: '檸檬茶', liked: true },
//   { food: '車仔麵', drinks: '奶茶', liked: false },
//   { food: '叉燒飯', drinks: '鴛鴦', liked: true },
//   { food: '烏冬面', drinks: '咖啡', liked: true },
//   { food: '雞扒飯', drinks: '檸檬茶', liked: false },
//   { food: '豬扒飯', drinks: '咖啡', liked: false },
//   { food: '雞扒飯', drinks: '阿華田', liked: true },
//   { food: '豬扒飯', drinks: '檸檬茶', liked: true },
//   { food: '雞扒飯', drinks: '咖啡', liked: false },
//   { food: '雞扒飯', drinks: '咖啡', liked: false },
//   { food: '叉燒飯', drinks: '奶茶', liked: false }
// ]

// const testData = [
//   { food: '叉燒飯', drinks: '奶茶', liked: false }
// ]

export default function Home () {
  const [trainingData, setTrainingData] = useState([
    { food: '燒鴨飯', drinks: '檸檬茶', liked: true },
    { food: '車仔麵', drinks: '奶茶', liked: false },
    { food: '叉燒飯', drinks: '鴛鴦', liked: true },
    { food: '烏冬面', drinks: '咖啡', liked: true },
    { food: '雞扒飯', drinks: '檸檬茶', liked: false },
    { food: '豬扒飯', drinks: '咖啡', liked: true },
    { food: '豬扒飯', drinks: '咖啡', liked: true },
    { food: '豬扒飯', drinks: '咖啡', liked: true },
    { food: '豬扒飯', drinks: '咖啡', liked: false },
    { food: '豬扒飯', drinks: '咖啡', liked: false },
    { food: '豬扒飯', drinks: '咖啡', liked: false },
    { food: '雞扒飯', drinks: '阿華田', liked: true },
    { food: '豬扒飯', drinks: '檸檬茶', liked: true },
    { food: '雞扒飯', drinks: '咖啡', liked: false },
    { food: '雞扒飯', drinks: '咖啡', liked: false },
    { food: '叉燒飯', drinks: '奶茶', liked: false }
  ])

  // const [testData, setTestData] = useState([
  //   { food: '豬扒飯', drinks: '咖啡', liked: true }
  // ])

  const [vail, setVail] = useState({
    food: '燒鴨飯',
    drinks: '檸檬茶'
  })

  const [addTrainingData, setAddTrainingData] = useState(['', '', 0])

  const [temVail, setTemVail] = useState(['燒鴨飯', '檸檬茶'])
  // 判定結果的列
  const className = 'liked'

  // 用來預測的數據標籤
  const features = ['food', 'drinks']
  // const features = ['food', 'drinks']

  // 創建模型：
  const dt = new DecisionTree(trainingData, className, features)
  // 用來預測的數據標籤
  // console.log(dt)
  const predictedClass = dt.predict(vail)
  // 導入測試數據，返回樣本的準確性
  const accuracy = dt.evaluate(trainingData)
  // const treeJson = dt.toJSON() // 底層模型，可用來可視化或者再次使用
  // const preTrainedDecisionTree = new DecisionTree(treeJson) 這樣可以直接使用這個訓練好的模型
  // dt.import(treeJson) 這樣可以直接在現有樹中導入這個訓練好的模型

  function deleted (arrIndex) {
    setTrainingData(
      trainingData.filter((item, index) => index !== arrIndex)
    )
  }

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
              <span className='w-1/4'>主食</span>
              <span className='w-1/4'>飲料</span>
              <span className='w-1/4'>顧客評價</span>
              <span className='w-1/4'>操作</span>
            </div>
            <div className='h-px bg-black my-2' />
            {
              trainingData.map((item, index) => {
                return (
                  <div key={index} className='flex my-2'>
                    <span className='w-1/4'>{item.food}</span>
                    <span className='w-1/4'>{item.drinks}</span>
                    <span className='w-1/4'>{item.liked ? '喜歡' : '不喜歡'}</span>
                    <div className='w-1/4'>
                      <button
                        className=' text-red-600'
                        onClick={() => deleted(index)}
                      >
                          刪除數據
                      </button>
                    </div>
                  </div>
                )
              })
            }
          </div>
          {/* <div className='w-96 text-center mt-10'>
            <h1 className='text-xl font-bold'>
              這次測試數據，返回樣本的準確性
            </h1>
            <div className='flex'>
              <span className='w-1/3'>主食</span>
              <span className='w-1/3'>飲料</span>
              <span className='w-1/3'>顧客評價</span>
            </div>
            <div className='h-px bg-black my-2' />
            {
              testData.map((item, index) => {
                return (
                  <div key={index} className='flex'>
                    <span className='w-1/3'>{item.food}</span>
                    <span className='w-1/3'>{item.drinks}</span>
                    <span className='w-1/3'>{item.liked ? '喜歡' : '不喜歡'}</span>
                  </div>
                )
              })
            }
          </div> */}
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
                <span className='w-1/3'>主食</span>
                <span className='w-1/3'>飲料</span>
                <span className='w-1/3' />
              </div>
              <div className='flex'>
                <input
                  className='w-1/3 px-1 border-black border-2 mx-1'
                  value={temVail[0]}
                  onChange={e => setTemVail([e.target.value, temVail[1]])}
                />
                <input className='w-1/3 px-1 border-black border-2 mx-1' value={temVail[1]} onChange={e => setTemVail([temVail[0], e.target.value])} />
                <button
                  className='w-1/3 bg-blue-700 hover:bg-blue-600 text-white border-gray-400'
                  onClick={() => {
                    setVail({
                      food: temVail[0],
                      drinks: temVail[1]
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
          <div>
            <h3 className='text-xl font-bold pb-5'>
              添加樣本：顧客評價(0：不喜歡，1：喜歡)
            </h3>
            <div className='w-96 text-center'>
              <div className='flex'>
                <span className='w-1/4'>主食</span>
                <span className='w-1/4'>飲料</span>
                <span className='w-1/4'>顧客評價</span>
                <span className='w-1/4'>操作</span>
              </div>
              <div className='flex'>
                <input
                  className='w-1/4 px-1 border-black border-2 mx-1'
                  value={addTrainingData[0]}
                  onChange={e => setAddTrainingData([e.target.value, addTrainingData[1], addTrainingData[2]])}
                />
                <input
                  className='w-1/4 px-1 border-black border-2 mx-1'
                  value={addTrainingData[1]}
                  onChange={e => setAddTrainingData([addTrainingData[0], e.target.value, addTrainingData[2]])}
                />
                <input
                  className='w-1/4 px-1 border-black border-2 mx-1'
                  value={addTrainingData[2]}
                  onChange={e => setAddTrainingData([addTrainingData[0], addTrainingData[1], e.target.value])}
                />
                <button
                  className='w-1/4 bg-blue-700 hover:bg-blue-600 text-white border-gray-400'
                  onClick={() => {
                    console.log(addTrainingData[2])
                    if (addTrainingData[2] !== 0 && addTrainingData[2] !== 1) {
                      window.alert('顧客評價內只能填入0或者1')
                    } else {
                      setTrainingData(
                        [
                          ...trainingData,
                          {
                            food: addTrainingData[0], drinks: addTrainingData[1], liked: addTrainingData[3] === 1
                          }
                        ]
                      )
                    }
                  }}
                >
                    添加
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
