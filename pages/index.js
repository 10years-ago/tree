import { data } from '../lib/data'
import { useState } from 'react'
// import CSVReader from 'react-csv-reader'
const DecisionTree = require('../lib/decision-tree')

export default function Home () {
  // const [trainingData, setTrainingData] = useState(data)
  const trainingData = data
  const [vail, setVail] = useState({
    building_num: '',
    has_old_people: '',
    has_child: '',
    floor_num: '',
    is_usual_residence: ''
  })

  const [temVail, setTemVail] = useState(['', '', '', '', ''])
  // 用來預測的數據標籤
  // const features = ['building_num', 'has_old_people', 'has_child', 'floor_num', 'is_usual_residence']
  const [features, setFeatures] = useState(['building_num', 'has_old_people', 'has_child', 'floor_num', 'is_usual_residence'])
  const [delFeatures, setDelFeatures] = useState([])
  // const [className, setClassName] = useState('voted')
  const className = 'voted'
  // 判定結果的列
  // const className = 'liked'

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

  // function deleted (arrIndex) {
  //   setTrainingData(
  //     trainingData.filter((item, index) => index !== arrIndex)
  //   )
  // }
  console.log(dt)
  console.log(vail)
  console.log(predictedClass)
  return (
    <div>
      <h1 className='text-3xl font-bold pb-10'>
        決策樹
      </h1>
      <div className='flex'>
        <div>
          <div className='text-center' style={{ width: '800px' }}>
            <h1 className='text-xl font-bold'>
              這是訓練的數據
            </h1>
            <div className='flex w-full'>
              <span className=' w-20 mr-2'>棟別</span>
              <span className='w-20 mr-2'>是否有老人</span>
              <span className='w-20 mr-2'>是否有小孩</span>
              <span className='w-20 mr-2'>樓層</span>
              <span className='w-20 mr-2'>是否常住</span>
              <span className='w-20 mr-2'>是否讚成</span>
              {/* <span className='w-20 mr-2'>操作</span> */}
            </div>
            <div className='h-px bg-black my-2' />
            {
              !!trainingData[0].building_num && trainingData.map((item, index) => {
                return (
                  <div key={index} className='flex w-full my-2 text-center'>
                    <span className='w-20 mr-2'>{item.building_num}</span>
                    <span className='w-20 mr-2'>{item.has_old_people === '1' ? '是' : '否'}</span>
                    <span className='w-20 mr-2'>{item.has_child === '1' ? '是' : '否'}</span>
                    <span className='w-20 mr-2'>{item.floor_num}</span>
                    <span className='w-20 mr-2'>{item.is_usual_residence === '1' ? '是' : '否'}</span>
                    <span className='w-20 mr-2'>{item.voted ? '讚成' : '不讚成'}</span>
                  </div>
                )
              })
            }
          </div>
        </div>
        <div className=' ml-10'>
          {/* <CSVReader
            onFileLoaded={(data, fileInfo, originalFile) => {
              // console.log(data)
              setFeatures([data[0][0], data[0][1], data[0][2], data[0][3], data[0][4]])
              setClassName(data[0][5])
              data.shift()
              data.pop()
              // data.unshift()
              setTrainingData(data.map(item => {
                return {
                  building_num: item[0],
                  has_old_people: item[1],
                  has_child: item[2],
                  floor_num: item[3],
                  is_usual_residence: item[4],
                  voted: item[5] === '1'
                }
              }
              ))
            }}
          /> */}
          <h3 className='text-xl font-bold pb-10'>
            樣本準確性: {accuracy * 100}%
          </h3>
          <h3 className='text-xl font-bold pb-10'>
            樣本標籤列:點擊可去除該選擇的標籤列
            {
              features.map((item, index) => {
                const featuresIndex = index
                return (
                  <p
                    key={featuresIndex}
                    onClick={() => {
                      setFeatures([...features.filter((item, index) => index !== featuresIndex)])
                      setDelFeatures([...delFeatures, item])
                    }}
                  >
                    {item}
                  </p>
                )
              })
            }
          </h3>
          <h3 className='text-xl font-bold pb-10'>
            不需要的標籤列:
            {
              delFeatures.map((item, index) => {
                const delFeaturesIndex = index
                return (
                  <p
                    key={delFeaturesIndex}
                    onClick={() => {
                      setFeatures([...features, item])
                      setDelFeatures([...delFeatures.filter((item, index) => index !== delFeaturesIndex)])
                    }}
                  >
                    {item}
                  </p>
                )
              })
            }
          </h3>
          <h3 className='text-xl font-bold pb-10'>
            樣本預測結果列: {className}
          </h3>
          <div>
            <h3 className='text-xl font-bold pb-5'>
              驗證：
            </h3>
            <div className='w-auto text-center'>
              <div className='flex'>
                <span className='w-1/6'>棟別</span>
                <span className='w-1/6'>是否有老人</span>
                <span className='w-1/6'>是否有小孩</span>
                <span className='w-1/6'>樓層</span>
                <span className='w-1/6'>是否常住</span>
              </div>
              <div className='flex'>
                <input
                  className='w-1/6 px-1 border-black border-2 mx-1'
                  value={temVail[0]}
                  onChange={e => setTemVail([e.target.value, temVail[1], temVail[2], temVail[3], temVail[4]])}
                />
                <input className='w-1/6 px-1 border-black border-2 mx-1' value={temVail[1]} onChange={e => setTemVail([temVail[0], e.target.value, temVail[2], temVail[3], temVail[4]])} />
                <input className='w-1/6 px-1 border-black border-2 mx-1' value={temVail[2]} onChange={e => setTemVail([temVail[0], temVail[1], e.target.value, temVail[3], temVail[4]])} />
                <input className='w-1/6 px-1 border-black border-2 mx-1' value={temVail[3]} onChange={e => setTemVail([temVail[0], temVail[1], temVail[2], e.target.value, temVail[4]])} />
                <input className='w-1/6 px-1 border-black border-2 mx-1' value={temVail[4]} onChange={e => setTemVail([temVail[0], temVail[1], temVail[2], temVail[3], e.target.value])} />
                <button
                  className='w-20 bg-blue-700 hover:bg-blue-600 text-white border-gray-400'
                  onClick={() => {
                    setVail({
                      building_num: String(temVail[0]),
                      has_old_people: String(temVail[1]),
                      has_child: String(temVail[2]),
                      floor_num: String(temVail[3]),
                      is_usual_residence: String(temVail[4])
                    })
                  }}
                >
                    驗證
                </button>
              </div>
              <h3 className='text-xl font-bold pb-5'>
                驗證結果：{predictedClass ? '讚成' : '不讚成'}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
