import numpy as np 
from flask import Flask, jsonify, request
import pickle
from flask_cors import CORS

gaussian = pickle.load(open("gaussian.pkl", "rb"))
lr_c = pickle.load(open("lr_c.pkl", "rb"))
rdf = pickle.load(open("rdf.pkl", "rb"))
svc_c = pickle.load(open("svc_c.pkl", "rb"))
svc_r = pickle.load(open("svc_r.pkl", "rb"))
dtree_c = pickle.load(open("dtree_c.pkl", "rb"))


app = Flask(__name__)
CORS(app)

@app.route("/api", methods=['POST'])
def predict():
    data = request.get_json(force=True)
    inc_data = [data["age"], int(data["sex"]), data["trestbps"], data["chol"], data['fbs'], data["thalach"], int(data["exang"]), data["oldpeak"], data['ca'], data['cp_0'], 
    data['cp_1'], data['cp_2'], data['cp_3'], data['thal_0'], data['thal_1'], data['thal_2'], data['thal_3'], data['slope_0'], data['slope_1'], data['slope_2'], 
    data["restecg_0"], data["restecg_1"], data["restecg_2"]]
    predict_request = np.array(inc_data)

    dtree_c_result = dtree_c.predict([predict_request])
    lr_c_result = lr_c.predict([predict_request])
    rdf_result = rdf.predict([predict_request])
    svc_c_result = svc_c.predict([predict_request])
    svc_r_result = svc_r.predict([predict_request])
    gaussian_result = gaussian.predict([predict_request])


    return jsonify({
        "lr_c": int(lr_c_result[0]), 
        "svc_c": int(svc_c_result[0]),
        "svc_r": int(svc_r_result[0]), 
        "gaussian": int(gaussian_result[0]), 
        "dtree_c": int(dtree_c_result[0])})

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080, debug=True)