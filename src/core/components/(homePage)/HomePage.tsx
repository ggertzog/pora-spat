'use client';
import { TagWithImage } from '@/core/components/ui/TagWithImage/TagWithImage';
import styles from './styles.module.scss';
import { useTagsQuery } from '@/core/api/queryFetchers/getTagsQuery';
import { CategoryCard } from '../ui/CategoryCard/CategoryCard';
import { useCategoriesQuery } from '@/core/api/queryFetchers/getCategoriesQuery';
import { title } from 'process';

const HomePage = () => {
    const { data: tags } = useTagsQuery();
    const { data: categories } = useCategoriesQuery();

    const filteredCategories = categories?.filter((category) => category.count && category.count > 0);

    return (
        <>
            <section className={styles.heroSection}>
            </section>

            <section className={styles.tagsSection}>
                <div className={styles.tagsContainer}>
                    {tags?.map((tag) => (
                        <TagWithImage key={tag.id} card={tag} size="xl" />
                    ))}
                </div>
            </section>

            <section className={styles.categorySection}>
                <div className={styles.categoryContainer}>
                    {filteredCategories?.map((category) => (
                        <CategoryCard key={category.id} category={category} size='xl' />
                    ))}
                </div>
            </section>

            <section className={styles.titleSection}>
                <div className={styles.titleContainer}>
                    <h1 className={styles.title}>Интернет-магазин мебели для уютного дома</h1>
                    <p className={styles.description}>&#171;Пора спать&#187;&#160;&#8212; ваш идеальный выбор! Мы&#160;предлагаем широкий ассортимент кроватей,
                        матрацев, шкафов, комодов и&#160;другой мебели для создания уютной и&#160;комфортной спальни.</p>
                </div>
            </section>
        </>
    )
}

export default HomePage;