export const domainTransformations = [
    {
        domain: "Number",
        key: ["ลำดับที่(รันอัตโนมัติ)", "ลำดับที่"]
    },
    {
        domain: "Generic Name",
        key: ["ชื่อยา"]
    },
    {
        domain: "Class",
        key: ["กลุ่มยา"],
        isMergedCells: true,
        icon: 'graph_3'
    },
    {
        domain: "MOA",
        key: ["MOA"],
        icon: 'hov'
    },
    {
        domain: "Indication",
        key: ["Indications"],
        icon: 'medical_services'
    },
    {
        domain: "Regimen",
        key: ["Dosage Regimen"],
        icon: 'lists'
    },
    {
        domain: "Metabolism",
        key: ["Metabolism (ADME)"],
        icon: 'change_circle'
    },
    {
        domain: "Limitations",
        key: ["CrCl/EGFR ที่มีการแนะนำในผู้ป่วยไต (mL/min)"],
        icon: 'warning'
    },
    {
        domain: "ADR",
        key: ["ADRs/DIs ที่สำคัญ (Practical Point) เป็นไปได้อยากให้แบ่งระบบด้วย"],
        icon: 'flash_on'
    },
    {
        domain: "Patient Education",
        key: ["Patient Educations"],
        icon: 'sms'
    }
];

export function transformDataArray(dataArray){
    var result = dataArray.map((dat, index) => {
        var newObject = {};
        for (var domain of domainTransformations) {
            var isAdded = false;
            if (domain.key) {
                for (var k of domain.key) {
                    if (dat[k]){
                        newObject[domain.domain] = dat[k];
                        isAdded = true;
                        break;
                    }
                    else {
                        newObject[domain.domain] = null;
                    }
                }
            }

            if (!isAdded && domain.isMergedCells === true && domain.key) {
                for (var i = index - 1; i >= 0; i--){
                    let isFound = false;
                    for (var k of domain.key) {
                        if (dataArray[i][k].trim().length > 0){
                            newObject[domain.domain] = dataArray[i][k];
                            isAdded = true;
                            isFound = true;
                            break;
                        }
                    }
                    if (isFound)
                        break;
                }
            }
        }
        return newObject;
    });
    return result;
}