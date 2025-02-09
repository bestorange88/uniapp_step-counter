import Foundation
import HealthKit

@objc(StepCounter)
class StepCounter: NSObject {
    let healthStore = HKHealthStore()

    // 请求授权
    @objc func requestAuthorization(_ callback: @escaping (Bool) -> Void) {
        let stepType = HKQuantityType.quantityType(forIdentifier: .stepCount)!
        healthStore.requestAuthorization(toShare: [], read: [stepType]) { success, _ in
            callback(success)
        }
    }

    // 获取当天步数
    @objc func getTodayStepCount(_ callback: @escaping (Int) -> Void) {
        let stepType = HKQuantityType.quantityType(forIdentifier: .stepCount)!
        let startOfDay = Calendar.current.startOfDay(for: Date())
        let predicate = HKQuery.predicateForSamples(withStart: startOfDay, end: Date(), options: .strictStartDate)

        let query = HKStatisticsQuery(quantityType: stepType, quantitySamplePredicate: predicate, options: .cumulativeSum) { _, result, _ in
            let stepCount = result?.sumQuantity()?.doubleValue(for: HKUnit.count()) ?? 0
            callback(Int(stepCount))
        }
        healthStore.execute(query)
    }
}
