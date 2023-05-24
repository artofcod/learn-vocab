
function commonFrm() {
    return {
        table: (tableHeadObj) => {
            return (`<table class="table table-hover table-striped text-light">
                    <thead>
                        <tr>
                        <th>${tableHeadObj.slno}</th>
                        <th>${tableHeadObj.name}</th>
                        <th>${tableHeadObj.engName}</th>
                        <th>${tableHeadObj.description}</th>
                        ${tableHeadObj.isAction ? `<th>action</th>` : ''}
                    </tr>
                    </thead>
                    <tbody>
                       
                    </tbody>
                    <!-- end of tbody -->
                </table>
                <!-- end of table -->`);
        },

        data: (dataObj) => {
            const actionFrm = `<td>
                                <div class="nice-icon edit mr-2">
                                    <i class="ion-edit"></i>
                                </div>
                                <div class="nice-icon delete">
                                    <i class="ion-android-delete"></i>
                                </div>
                            </td>`;
            return Object.freeze(`
                    <tr
                    ${!dataObj.isAction ? 'class="active-hover"' : ''}
                    id="id${dataObj.key}"
                    data-index="${dataObj.key}"
                    data-${dataObj.context}-id="${dataObj.id}">
                        <td>${dataObj.key}</td>
                        <td>${dataObj.name}</td>
                        <td>${dataObj.engName}</td>
                        <td>${dataObj.description}</td>
                        ${dataObj.isAction ? actionFrm : ''}    
                    </tr>
                    <!-- end of tr -->
                `);
        },

        noData: (emptyObj) => {
            let compairContext = query('#content-pannel').children[0].className;
            return (`<div class="row text-center my-3">
                    <div class="col my-5 py-4">
                        <img src="assets/img/undraw_no_data_qbuo.svg" alt="" srcset=""
                            class="img-fluid">
                        <p class="mt-1">
                            <span class="main-message">
                                ${emptyObj.mainMessage}
                            </span>
                            <span class="sub-message">
                                ${emptyObj.subMessage}
                                <span class="name-indicatior">${emptyObj.subMessageIdicator}</span>
                            </span>
                            <span class="nodata-action ${emptyObj.context !== compairContext ? 'd-none' : ''}">
                                <button class="btn px-4 mt-4">
                                    <span>Add ${emptyObj.context}</span>
                                    <i class="ion-plus-round"></i>
                                </button>
                            </span>
                        </p>
                    </div>
                    <!-- end of .col -->
                </div>`)
        },

        input: (inputObj) => {

            return (`
                <tr 
                id="id${inputObj.key}"
                data-index="${inputObj.key}"
                data-${inputObj.context}-id="${inputObj.id}">

                    <td>${inputObj.key}</td>
                    <td colspan=4>
                        <div class="row">
                            <div class="col-6">
                                <div class="form-group ${inputObj.context}-name${inputObj.key} mb-4">
                                    <label for="" class="form-input-label sr-only">${inputObj.context}
                                        name</label>
                                    <div class="">
                                        <input type="text"
                                            class="form-control form-control-sm"
                                            placeholder="${inputObj.context} Name"
                                            id="${inputObj.context}-name-${inputObj.key}" 
                                            value="${inputObj.name}">
                                    </div>
                                    <span class=" col-12 general-error d-none"> A name is
                                        required</span>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="form-group ${inputObj.context}-eng-name${inputObj.key} mb-4">
                                    <label for="" class="form-input-label sr-only">${inputObj.context}
                                         English Name</label>
                                    <div class="">
                                        <input type="text"
                                            class="form-control form-control-sm"
                                            placeholder="${inputObj.context} English Name"
                                            id="${inputObj.context}-eng-name-${inputObj.key}" 
                                            value="${inputObj.engName}">
                                    </div>
                                    <span class=" col-12 general-error d-none"> A name is
                                        required</span>
                                </div>
                            </div>
                            <div class="col-9">
                                <div class="form-group ${inputObj.context}-description${inputObj.key} mb-1">
                                    <label for=""
                                        class="form-input-label text-right sr-only">${inputObj.context} Description</label>
                                    <textarea class="form-control form-control-sm"
                                        name="description"
                                        id="${inputObj.context}-description-${inputObj.key}"
                                        placeholder="${inputObj.context} Description"
                                        rows="2">${inputObj.description}</textarea>
                                </div>
                            </div>
                            <div class="col-3">
                                <div class="form-group text-center mx-auto">
                                    <button
                                    class="btn btn-success save py-1"
                                    id="btn${inputObj.key}"
                                    >
                                        <i class="ion-checkmark-round p-0"></i>
                                    </button>

                                    <button
                                    class="btn btn-danger cancel   py-1"
                                    id="btnCancel${inputObj.key}"
                                    >
                                        <i class="ion-close-round p-0"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
            `);
        }

    };

}
