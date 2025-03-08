import React from "react";
import Image from "next/image";
import Link from "next/link";


const NeuralNetwork = () => {
  return (
    <div className="min-h-screen bg-pink-100 p-8">
       <h1 className="text-4xl font-bold text-center text-pink-700 mb-6">
        Neural Network
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-900">Flowers Dataset</h2>
          <p className="mt-4 text-gray-700">
            เราใช้ <strong>Flowers Dataset</strong> จาก Kaggle เพื่อ Train โมเดล AI ที่สามารถจำแนกภาพของดอกไม้ 5 ชนิด ได้แก่:
          </p>
          <ul className="mt-2 text-gray-700 list-disc pl-5">
            <li>Daisy</li>
            <li>Dandelion</li>
            <li>Rose</li>
            <li>Sunflower</li>
            <li>Tulip</li>
          </ul>

          <p className="mt-4 text-gray-700">
            โมเดลถูกเทรนโดยใช้ <strong>Convolutional Neural Network (CNN)</strong> เพื่อให้สามารถพยากรณ์ดอกไม้จากภาพได้อย่างแม่นยำ
          </p>

          <p className="mt-4 text-blue-600 underline">
            ข้อมูล Dataset:{" "}
            <a 
              href="https://www.kaggle.com/datasets/rahmasleam/flowers-dataset" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700 font-semibold"
            >
              Flowers Dataset - Kaggle
            </a>
          </p>

          <div className="mt-6 text-center">
            <Link 
              href="/demo_neural_network"
              className="px-6 py-2 bg-rose-500 text-white rounded-lg shadow-md hover:bg-rose-400"
            >
              ทดลองอัปโหลดรูปดอกไม้
            </Link>
          </div>
        </div>

        <div className="flex justify-center">
          <Image
            src="/sample_flower.jpg"
            width={400}
            height={300}
            alt="Sample Flower"
            className="rounded-lg shadow-md"
          />
        </div>
      </div>

<section className="mt-12 bg-white p-6 rounded-lg shadow-md">
  <h2 className="text-xl font-semibold text-gray-900 text-center">
    STEP 1: นำเข้าไลบรารี และตรวจสอบ GPU
  </h2>
  <p className="mt-4 text-gray-700">
    ขั้นตอนเตรียมความพร้อมก่อนการพัฒนาโมเดล Deep Learning โดยเริ่มจากการนำเข้าไลบรารีที่จำเป็น
    ตรวจสอบไฟล์ข้อมูลใน /kaggle/input และเช็คว่า ใช้ GPU หรือ CPU ในการประมวลผล
    เพื่อให้แน่ใจว่ามีข้อมูลพร้อมและใช้ฮาร์ดแวร์ที่เหมาะสมก่อนเริ่ม Train โมเดล
  </p>
  <div className="mt-4 bg-gray-800 text-rose-300 p-4 rounded-lg overflow-auto text-sm">
    <pre>
{`import numpy as np
import pandas as pd
import os
import tensorflow as tf

for dirname, _, filenames in os.walk('/kaggle/input'):
    for filename in filenames:
        print(os.path.join(dirname, filename))

device = "/GPU:0" if tf.config.list_physical_devices('GPU') else "/CPU:0"
print("Using device:", device)`}
    </pre>
  </div>
</section>

<section className="mt-12 bg-white p-6 rounded-lg shadow-md">
  <h2 className="text-xl font-semibold text-gray-900 text-center">
    STEP 2: โหลด Dataset และ Normalize ข้อมูล
  </h2>
  <p className="mt-4 text-gray-700">
    โหลดและเตรียมชุดข้อมูลรูปภาพ โดยกำหนดตำแหน่งโฟลเดอร์ข้อมูล จากนั้นใช้ `image_dataset_from_directory`
    เพื่อแบ่งข้อมูลเป็น Train (80%) และ Test (20%) และทำ Normalization เพื่อปรับค่าพิกเซลให้อยู่ในช่วง (-1 ถึง 1)
    เพื่อช่วยให้โมเดลมีประสิทธิภาพมากขึ้น
  </p>
  <div className="mt-4 bg-gray-800 text-rose-300 p-4 rounded-lg overflow-auto text-sm">
    <pre>
{`import tensorflow as tf

data_dir = "/kaggle/input/flowers-dataset/flower_photos"

train_ds = tf.keras.preprocessing.image_dataset_from_directory(
    data_dir, image_size=(224, 224), batch_size=32, validation_split=0.2, subset="training", seed=42
)
test_ds = tf.keras.preprocessing.image_dataset_from_directory(
    data_dir, image_size=(224, 224), batch_size=32, validation_split=0.2, subset="validation", seed=42
)

normalization_layer = tf.keras.layers.Rescaling(1./127.5, offset=-1)
train_ds = train_ds.map(lambda x, y: (normalization_layer(x), y))
test_ds = test_ds.map(lambda x, y: (normalization_layer(x), y))`}
    </pre>
  </div>
</section>

<section className="mt-12 bg-white p-6 rounded-lg shadow-md">
  <h2 className="text-xl font-semibold text-gray-900 text-center">
    STEP 3: กำหนดคลาสของดอกไม้
  </h2>
  <p className="mt-4 text-gray-700">
    กำหนดประเภทของดอกไม้ที่โมเดลต้องจำแนก โดยใช้ตัวแปร `classes` ซึ่งเป็นรายการของชื่อดอกไม้
    ที่อยู่ใน Dataset ได้แก่ Daisy, Dandelion, Roses, Sunflowers และ Tulips
  </p>
  <div className="mt-4 bg-gray-800 text-rose-300 p-4 rounded-lg overflow-auto text-sm">
    <pre>
{`import matplotlib.pyplot as plt

classes = ['daisy', 'dandelion', 'roses', 'sunflowers', 'tulips']`}
    </pre>
  </div>
</section>

<section className="mt-12 bg-white p-6 rounded-lg shadow-md">
  <h2 className="text-xl font-semibold text-gray-900 text-center">
    STEP 4: แสดงรูปตัวอย่าง
  </h2>
  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
  
    <div>
      <p className="mt-4 text-gray-700">
      แสดงตัวอย่างรูปภาพจากชุดข้อมูลฝึกสอน (train_ds) โดยใช้ Matplotlib
      </p>
      <div className="mt-4 bg-gray-800 text-rose-300 p-4 rounded-lg overflow-auto text-sm">
        <pre>
{`plt.figure(figsize=(10, 10))
for images, labels in train_ds.take(1):
    for i in range(20):
        plt.subplot(4, 5, i + 1)
        plt.imshow((images[i].numpy() + 1) * 127.5 / 255)
        plt.title(classes[labels[i].numpy()])
        plt.axis("off")
plt.show()`}
        </pre>
      </div>
    </div>

    <div className="flex justify-center items-center">
    <img
  src="/test1.png"
  width="350"
  height="200"
  alt="ตัวอย่างภาพจาก Dataset"
  className="rounded-lg shadow-md"
/>

</div>

  </div>
</section>

<section className="mt-12 bg-white p-6 rounded-lg shadow-md">
  <h2 className="text-xl font-semibold text-gray-900 text-center">
    STEP 5: ปรับปรุงการแสดงผล
  </h2>
  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
   
    <div>
      <p className="mt-4 text-gray-700">
      ใช้ Matplotlib เพื่อแสดงตัวอย่างรูปภาพจาก imageList ในรูปแบบ Grid ขนาด 4x5 โดยกำหนดให้แต่ละรูปแสดงชื่อประเภทของดอกไม้ 
      พร้อมปิดเส้นแกนเพื่อให้ดูสะอาดขึ้น และใช้ tight_layout() เพื่อจัดระยะห่างของ Grid ให้สวยงามก่อนแสดงผล
      </p>
      <div className="mt-4 bg-gray-800 text-rose-300 p-4 rounded-lg overflow-auto text-sm">
        <pre>
{`fig, axes = plt.subplots(4, 5, figsize=(15, 6))
axes = axes.flatten()

for i, (img, label) in enumerate(imageList):
    if i >= len(axes): break
    axes[i].imshow(img)
    axes[i].set_title(label)
    axes[i].axis('off')

plt.tight_layout()
plt.show()`}
        </pre>
      </div>
    </div>


    <div className="flex justify-center items-center">
    <img
  src="/test2.png"
  width="600"
  height="400"
  alt="ตัวอย่างภาพจาก Dataset"
  className="rounded-lg shadow-md"
/>
    </div>
  </div>
</section>



<section className="mt-12 bg-white p-6 rounded-lg shadow-md">
  <h2 className="text-xl font-semibold text-gray-900 text-center">
    STEP 6: สร้างโมเดล Convolutional Neural Network (CNN)
  </h2>
  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
    
    <div>
      <p className="mt-4 text-gray-700">
        โมเดลนี้เป็น Convolutional Neural Network (CNN) 
        มี 5 Convolutional Layers พร้อม MaxPooling, BatchNormalization และ Dropout
      </p>
      <div className="mt-4 bg-gray-800 text-rose-300 p-4 rounded-lg overflow-auto text-sm">
        <pre>
{`import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers

input_shape = (224, 224, 3)

model = keras.Sequential([
    layers.Conv2D(16, kernel_size=3, strides=1, padding="same", activation="relu", input_shape=input_shape),
    layers.MaxPooling2D(pool_size=2, strides=2),
    layers.BatchNormalization(),

    layers.Conv2D(32, kernel_size=3, strides=1, padding="same", activation="relu"),
    layers.MaxPooling2D(pool_size=2, strides=2),
    layers.BatchNormalization(),

    layers.Conv2D(64, kernel_size=3, strides=1, padding="same", activation="relu"),
    layers.MaxPooling2D(pool_size=2, strides=2),

    layers.Conv2D(128, kernel_size=3, strides=1, padding="same", activation="relu"),
    layers.MaxPooling2D(pool_size=2, strides=2),
    layers.Dropout(0.2),

    layers.Conv2D(256, kernel_size=3, strides=1, padding="same", activation="relu"),
    layers.MaxPooling2D(pool_size=2, strides=2),
    layers.Dropout(0.3),

    layers.Flatten(),

    layers.Dense(1024, activation="relu"),
    layers.Dense(512, activation="relu"),
    layers.Dense(256, activation="relu"),
    layers.Dense(128, activation="relu"),
    layers.Dense(64, activation="relu"),
    layers.Dense(32, activation="relu"),
    layers.Dense(16, activation="relu"),
    layers.Dense(5, activation="softmax")  
])

model.summary()`}
        </pre>
      </div>
    </div>

    
    <div className="flex justify-center items-center">
      <img
        src="/test3.png" 
        width="600"
        height="400"
        alt="โครงสร้างของโมเดล CNN"
        className="rounded-lg shadow-md"
      />
    </div>
  </div>
</section>


<section className="mt-12 bg-white p-6 rounded-lg shadow-md">
  <h2 className="text-xl font-semibold text-gray-900 text-center">
    STEP 7: กำหนด Loss Function และ Optimizer
  </h2>
  <div className="mt-6">
    {/* 🔹 ฝั่งซ้าย - โค้ด */}
    <p className="mt-4 text-gray-700">
      หลังจากสร้างโมเดลแล้ว จำเป็นต้องกำหนด Loss Function และ Optimizer 
      เพื่อใช้สำหรับการปรับปรุงค่า Weight ของโมเดลระหว่างการ Train  
    </p>
    <div className="mt-4 bg-gray-800 text-rose-300 p-4 rounded-lg overflow-auto text-sm">
      <pre>
{`import tensorflow as tf

model.compile(
    optimizer=tf.keras.optimizers.Adam(learning_rate=0.0007),
    loss=tf.keras.losses.SparseCategoricalCrossentropy(from_logits=False),
    metrics=["accuracy"]
)`}
      </pre>
    </div>
  </div>
</section>

{/* 🔹 STEP 8: Train Model และบันทึกค่าความแม่นยำ */}
<section className="mt-12 bg-white p-6 rounded-lg shadow-md">
  <h2 className="text-xl font-semibold text-gray-900 text-center">
    STEP 8: เทรนโมเดล และบันทึกค่าความแม่นยำ
  </h2>
  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* 🔹 ฝั่งซ้าย - โค้ด */}
    <div>
      <p className="mt-4 text-gray-700">
        ทำการ Train โมเดลโดยใช้ 'train_ds' และ 'test_ds'  
        และบันทึกโมเดลที่ดีที่สุดโดยใช้ 'ModelCheckpoint'
      </p>
      <div className="mt-4 bg-gray-800 text-rose-300 p-4 rounded-lg overflow-auto text-sm">
        <pre>
{`import tensorflow as tf
epochs = 10

epoch_count = []
loss_values = []
test_loss_values = []
train_acc = []
test_acc = []

checkpoint = tf.keras.callbacks.ModelCheckpoint(
    "best_model.keras", save_best_only=True, monitor="val_accuracy", mode="max"
)

history = model.fit(
    train_ds,
    epochs=epochs,
    validation_data=test_ds,
    callbacks=[checkpoint]  
)

epoch_count = list(range(epochs))
loss_values = history.history["loss"]
test_loss_values = history.history["val_loss"]
train_acc = history.history["accuracy"]
test_acc = history.history["val_accuracy"]

for epoch in range(epochs):
    print(
        f"Epoch: {epoch} | Loss: {loss_values[epoch]:.2f} | Test Loss: {test_loss_values[epoch]:.2f} | "
        f"Train Accuracy: {train_acc[epoch] * 100:.2f}% | Test Accuracy: {test_acc[epoch] * 100:.2f}%"
    )`}
        </pre>
      </div>
    </div>

    {/* 🔹 ฝั่งขวา - รูป */}
    <div className="flex justify-center items-center">
      <img
        src="/test4.png" 
        width="800"
        height="600"
        alt="กราฟ Loss และ Accuracy ของการเทรนโมเดล"
        className="rounded-lg shadow-md"
      />
    </div>
  </div>
</section>


{/* 🔹 STEP 9: ทดสอบโมเดล และวัดค่าความแม่นยำ */}
<section className="mt-12 bg-white p-6 rounded-lg shadow-md">
  <h2 className="text-xl font-semibold text-gray-900 text-center">
    STEP 9: ทดสอบโมเดล และวัดค่าความแม่นยำ
  </h2>
  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* 🔹 ฝั่งซ้าย - โค้ด */}
    <div>
      <p className="mt-4 text-gray-700">
        ทดสอบโมเดลโดยใช้ 'test_ds' และวัดค่าความแม่นยำ  
        จากนั้นแสดงผลลัพธ์เป็น เปอร์เซ็นต์ (%) 
      </p>
      <div className="mt-4 bg-gray-800 text-rose-300 p-4 rounded-lg overflow-auto text-sm">
        <pre>
{`def print_accuracy(model):
    loss, accuracy = model.evaluate(test_ds)
    print(f"Test Accuracy: {accuracy * 100:.2f}%")

print_accuracy(model)`}
        </pre>
      </div>
    </div>

    
    <div className="flex justify-center items-center">
      <img
        src="/test5.png" 
        width="600"
        height="400"
        alt="ผลลัพธ์ Test Accuracy"
        className="rounded-lg shadow-md"
      />
    </div>
  </div>
</section>


<section className="mt-12 bg-white p-6 rounded-lg shadow-md">
  <h2 className="text-xl font-semibold text-gray-900 text-center">
    STEP 10: ใช้โมเดลทำการพยากรณ์ (Prediction)
  </h2>
  <div className="mt-6">
    {/* 🔹 ฝั่งซ้าย - โค้ด */}
    <p className="mt-4 text-gray-700">
      ใช้โมเดลที่เทรนแล้วในการพยากรณ์ ชนิดของดอกไม้  
      โดยทำการโหลดภาพ, แปลงเป็นอาร์เรย์, ทำ Normalize และพยากรณ์ด้วยโมเดล  
    </p>
    <div className="mt-4 bg-gray-800 text-rose-300 p-4 rounded-lg overflow-auto text-sm">
      <pre>
{`import tensorflow as tf
import numpy as np
import matplotlib.pyplot as plt
from tensorflow.keras.preprocessing import image

class_labels = ["Daisy", "Dandelion", "Roses", "Sunflowers", "Tulips"]  

image_path = "/content/img9.jpeg"  
img = image.load_img(image_path, target_size=(224, 224))  

img_array = image.img_to_array(img)
img_array = np.expand_dims(img_array, axis=0) 
img_array = img_array / 127.5 - 1  

model = tf.keras.models.load_model("/content/flower_type.h5") 

predictions = model.predict(img_array)

predicted_class = np.argmax(predictions, axis=1)[0] 

plt.imshow(img)
plt.axis("off")
plt.title(f"Predicted Class: {class_labels[predicted_class]}")
plt.show()`}
      </pre>
    </div>
  </div>
</section>

    </div>
  );
};

export default NeuralNetwork;
